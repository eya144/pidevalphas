import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionService } from '../mission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Mission } from '../core/models/Mission';

@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {
  missionForm!: FormGroup;
  projetId!: number;

  @Output() missionAdded = new EventEmitter<Mission>();

  constructor(
    private fb: FormBuilder,
    private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.missionForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      etatMission: ['', Validators.required],
      priorite: ['', Validators.required],
      budget: ['', [Validators.min(0), Validators.pattern('^[0-9]+$')]],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.pattern('^[0-9-]*$')] // optional
    });

    // Récupération de l'ID du projet depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
    this.projetId = id ? Number(id) : NaN;

    if (isNaN(this.projetId) || this.projetId <= 0) {
      console.error("❌ ID du projet invalide !");
      throw new Error("ID du projet manquant ou invalide");
    }
  }

  onSubmit() {
    if (this.missionForm.valid && this.projetId) {
      const newMission: Mission = {
        idMission: 0, // Ajout temporaire (sera remplacé par le backend)
        ...this.missionForm.value,
        projetId: this.projetId
      };

      this.missionService.addMission(newMission, this.projetId).subscribe({
        next: (response) => {
          console.log("✅ Mission ajoutée avec succès !", response);
          this.missionAdded.emit(response);
          this.router.navigate(['/missions']);
          this.missionForm.reset(); // Reset uniquement après un succès
        },
        error: (error) => {
          console.error("❌ Erreur lors de l'ajout de la mission : ", error);
        }
      });
    }
  }
}
