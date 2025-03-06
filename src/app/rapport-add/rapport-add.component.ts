import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../services/rapport.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Inspection, NonConformity, RapportQualite } from '../models/Inspection.model';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-rapport-add',
  templateUrl: './rapport-add.component.html',
  styleUrls: ['./rapport-add.component.css']
})
export class RapportAddComponent  implements OnInit {

  idRapport!: number;
  inspectionId! : number;
  rapport!: RapportQualite;
  inspection!: Inspection;
  nonConform!: NonConformity;

  constructor(
    private route: ActivatedRoute,
    private rapportService: RapportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idRapport = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID du rapport récupéré:', this.idRapport); // Vérification

    if (!this.idRapport || this.idRapport <= 0 || isNaN(this.idRapport)) {
      console.error('ID de rapport invalide:', this.idRapport);
      return; // Arrêter ici pour éviter d’envoyer une requête invalide
    }

    this.rapportService.getRapportById(this.idRapport).subscribe(
      (data) => {
        this.rapport = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du rapport', error);
      }
    );
  }
 // Function to delete the report
deleteRapport(): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action is irreversible!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.rapportService.deleteRapport(this.idRapport).subscribe({
        next: () => {
          Swal.fire('Deleted!', 'The report has been successfully deleted.', 'success');
          this.router.navigate(['/inspections']);
        },
        error: () => {
          Swal.fire('Error', 'Unable to delete the report.', 'error');
        }
      });
    }
  });
}
generatePDF(): void {
  const doc = new jsPDF();

  // 🎨 Color definitions
  const primaryColor = [51, 51, 51]; // Dark gray
  const textColor = [50, 50, 50]; // Standard gray
  const borderColor = [180, 180, 180]; // Light gray
  const highlightColor = [128, 0, 0]; // Dark red for headings
  const contentBackgroundColor = [240, 240, 240]; // Light gray background for entire content section

  // 🏢 Add header with colored background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 30, 'F');

  // 🖼 Add logo with dynamic size
  const logo = new Image();
  logo.src = '/assets/img/logo/logo.png';

  logo.onload = () => {
    // Adjust the logo size
    const logoWidth = 40; // Increase the width of the logo
    const logoHeight = (logo.height / logo.width) * logoWidth; // Maintain aspect ratio

    // Add logo to the PDF
    doc.addImage(logo, 'PNG', 12, 7, logoWidth, logoHeight);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(' Inspection Report', 70, 20);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);

    let currentY = 40; // Position after the header

    if (!this.rapport) {
      Swal.fire('Error', 'No report found.', 'error');
      return;
    }

    const addTextWithPageBreak = (text: string, maxWidth: number) => {
      let splitText = doc.splitTextToSize(text, maxWidth);
      for (let i = 0; i < splitText.length; i++) {
        if (currentY > 270) {
          doc.addPage();
          currentY = 20;
        }
        doc.text(splitText[i], 15, currentY);
        currentY += 6;
      }
    };

    // 📝 Apply background color for the entire content area
    doc.setFillColor(contentBackgroundColor[0], contentBackgroundColor[1], contentBackgroundColor[2]);
    doc.rect(15, currentY, 180, 250, 'F'); // Covering the entire content area

    // Set text style for the content
    doc.setFontSize(14);
    doc.setTextColor(highlightColor[0], highlightColor[1], highlightColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text('Report content:', 15, currentY);
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.line(15, currentY + 2, 195, currentY + 2);
    currentY += 10;

    // Set the content text style
    doc.setFontSize(12);
    doc.setFont("times", "italic");
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);

    const contenuText = this.rapport.contenu?.length > 0 ? this.rapport.contenu : 'No content available.';
    addTextWithPageBreak(contenuText, 180);
    currentY += 10; // Update the Y position after adding content

    // 📸 Additional Content Section
    doc.setFontSize(14);
    doc.setTextColor(highlightColor[0], highlightColor[1], highlightColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text('Additional Content:', 15, currentY);
    doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
    doc.line(15, currentY + 2, 195, currentY + 2);
    currentY += 10;

    // Check if there’s a photo/video to add
    if (this.rapport.photoVideo && (this.rapport.photoVideo.endsWith('.jpg') || this.rapport.photoVideo.endsWith('.png'))) {
      const img = new Image();
      img.src = this.rapport.photoVideo;
      img.onload = () => {
        const imgWidth = 120;
        const imgHeight = (img.height / img.width) * imgWidth;
        if (currentY + imgHeight > 270) {
          doc.addPage();
          currentY = 20;
        }
        doc.setDrawColor(180, 180, 180);
        doc.rect(40, currentY, imgWidth + 10, imgHeight + 10);
        doc.addImage(img, 'JPEG', 45, currentY + 5, imgWidth, imgHeight);
        doc.save('report.pdf');
      };
    } else {
      doc.setFontSize(12);
      doc.setFont("times", "italic");
      doc.setTextColor(100, 100, 100);
      addTextWithPageBreak("No image available.", 180);
      doc.save('report.pdf');
    }
  };
}


}