import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from '../reclamation.service';
import { ToastrService } from 'ngx-toastr';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TextToSpeechService } from '../text-to-speech.service'; // Make sure the path is correct

@Component({
  selector: 'app-view-reclamation',
  templateUrl: './view-reclamation.component.html',
  styleUrls: ['./view-reclamation.component.css']
})
export class ViewReclamationComponent implements OnInit {
  reclamation: any;
  reclamationId: number;

  constructor(
        private dialog: MatDialog,
        private ttsService: TextToSpeechService,
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.reclamationId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadReclamation();
  }
  speakReclamation() {
    // Get the text that you want to convert to speech
    const text = this.reclamation.description;

    // Create a new SpeechSynthesisUtterance object
    const speech = new SpeechSynthesisUtterance(text);

    // Set voice language (optional)
    speech.lang = 'en-US'; // You can change to the language you prefer
    speech.volume = 1;     // Volume (0 to 1)
    speech.rate = 1;       // Speed (0.1 to 10)
    speech.pitch = 1;      // Pitch (0 to 2)

    // Speak the text
    window.speechSynthesis.speak(speech);
  };
  

  openDetailsDialog() {
    // Pass the reclamation resolved state to the dialog
    this.dialog.open(DetailsDialogComponent, {
      width: '600px', // Optional: you can set the width of the dialog
      data: { isResolved: this.reclamation.statusReclamation === 'RESOLVED' } // Pass resolved status
    });
  }
  loadReclamation() {
    this.reclamationService.getById(this.reclamationId).subscribe(
      (data: any) => {
        this.reclamation = data;
      },
      error => {
        console.error('Error loading reclamation:', error);
        this.toastr.error('Failed to load reclamation details');
      }
    );
  }

  goBack() {
    this.router.navigate(['/reclamations']);
  }

  markAsResolved() {
    this.reclamationService.markAsResolved(this.reclamationId).subscribe(() => {
      this.toastr.success('Reclamation marked as resolved');
      this.loadReclamation();
    });
  }

  markAsUnresolved() {
    this.reclamationService.markAsUnresolved(this.reclamationId).subscribe(() => {
      this.toastr.warning('Reclamation marked as unresolved');
      this.loadReclamation();
    });
  }
}
