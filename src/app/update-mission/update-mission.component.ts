import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionService } from '../mission.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mission } from '../Model/Mission';
@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.css']
})
export class UpdateMissionComponent implements OnInit {
  missionForm!: FormGroup;
  missionId!: number;
  projetId!: number; 
  isLoading: boolean = true;
  updateSuccess: boolean = false;
  updateError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private missionService: MissionService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.missionId = Number(params.get('idMission'));
      this.projetId = Number(params.get('id'));
      
      console.log("📌 ID Mission récupéré :", this.missionId);
      console.log("📌 ID Projet récupéré :", this.projetId);
      
      if (!this.missionId || isNaN(this.missionId) || this.missionId <= 0) {
        console.error("❌ ID de mission invalide !");
        return;
      }
      if (!this.projetId || isNaN(this.projetId) || this.projetId <= 0) {
        console.error("❌ ID de projet invalide !");
        return;
      }
      
      // Initialisation du formulaire
      this.missionForm = this.fb.group({
        nom: ['', Validators.required],
        description: ['', Validators.required],
        etatMission: ['', Validators.required],
        priorite: ['', Validators.required],
        budget: ['', [Validators.min(0), Validators.pattern('^[0-9]+$')]],
        startDate: ['', Validators.required],
        finishDate: ['', Validators.pattern('^[0-9-]*$')]
      });
      
      this.loadMissionData();
    });
  }
  

  loadMissionData(): void {
    this.missionService.getMissionById(this.missionId).subscribe({
      next: (mission) => {
        if (mission) {
          console.log("✅ Données de la mission récupérées :", mission);
          // Pré-remplissage du formulaire avec les données récupérées
          this.missionForm.patchValue({
            nom: mission.nom,
            description: mission.description,
            etatMission: mission.etatMission,
            priorite: mission.priorite,
            budget: mission.budget,
            startDate: mission.startDate,
            finishDate: mission.finishDate
          });
          // Si le backend fournit un projetId, on l'utilise
          if (mission.projetId && mission.projetId > 0) {
            this.projetId = mission.projetId;
          }
          console.log("📌 projetId après récupération :", this.projetId);
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des données de la mission :', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      this.isLoading = true;
      this.updateSuccess = false;
      this.updateError = false;

      const updatedMission: Mission = {
        idMission: this.missionId,
        ...this.missionForm.value,
        projetId: this.projetId
      };

      this.missionService.updateMission(updatedMission).subscribe({
        next: () => {
          console.log("✅ Mission mise à jour avec succès !");
          this.isLoading = false;
          this.updateSuccess = true;
          // Redirection immédiate vers la liste des missions du projet
          this.router.navigate([`/projets/${this.projetId}/missions`]);
        },
        error: (error) => {
          console.error("❌ Erreur lors de la mise à jour de la mission :", error);
          this.isLoading = false;
          this.updateError = true;
        }
      });
    }
  }
}
