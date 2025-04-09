import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../finance.service';
import { Facture } from 'src/app/core/models/Factures';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  factureForm!: FormGroup;
  isSubmitting = false;
  factures: Facture[] = [];
  showAddForm = false;
  isEditing = false;
  editingFactureId: number | null = null;
  idFacture!: number;
  selectedFacture: Facture | null = null;
  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  // PDF Generation
  isGeneratingPdf = false;

  // Tri
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllFactures();
  }
    // Méthode pour calculer les jours restants
    getDaysRemaining(dueDate: string): number {
      const currentDate = new Date();
      const dueDateObj = new Date(dueDate);
      const timeDiff = dueDateObj.getTime() - currentDate.getTime();
      return Math.floor(timeDiff / (1000 * 3600 * 24)); // Convertir la différence en jours
    }

      navigateToPaiement(idFacture: number | undefined): void {
        if (idFacture === undefined || isNaN(idFacture)) {
          console.error('Invalid invoice ID:', idFacture);
          return;
        }
        this.router.navigate(['/paiement', idFacture.toString()]); 
      }

  private getAllFactures(): void {
    this.financeService.getAllFactures().subscribe(
      factures => {
        this.factures = factures;
        this.totalItems = factures.length;
        console.log('Factures récupérées:', this.factures);
      },
      error => {
        console.error('Erreur lors de la récupération des factures:', error);
      }
    );
  }

  get currentPageFactures(): Facture[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.factures.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  initForm(): void {
    this.factureForm = this.fb.group({
      montantTotal: [null, [Validators.required, Validators.min(0)]],
      dateFacture: [null, Validators.required],
      dateEcheance: [null, Validators.required],
      montantTotalHorsTaxe: [null, [Validators.required, Validators.min(0)]],
      tva: [null, [Validators.required, Validators.min(0)]]
    });
  }

  toggleAddForm(): void {
    this.router.navigate(['/add-finance']);
  }

  addFacture(): void {
    if (this.factureForm.invalid) {
      return;
    }

    const formData = this.factureForm.value;

    this.financeService.addFacture(formData).subscribe(newFacture => {
      this.factures.push(newFacture);
      this.resetForm();
    });
  }

  deleteFacture(idFacture: number | undefined): void {
    if (idFacture === undefined) {
      console.error("ID de la facture non défini.");
      return;
    }

    const isConfirmed = confirm('Êtes-vous sûr de vouloir supprimer cette facture ?');

    if (isConfirmed) {
      this.financeService.deleteFacture(idFacture).subscribe(
        () => {
          this.factures = this.factures.filter(f => f.idFacture !== idFacture);
          console.log('Facture supprimée avec succès');
        },
        error => {
          console.error('Erreur lors de la suppression de la facture:', error);
        }
      );
    } else {
      console.log('Suppression annulée');
    }
  }

  updateFacture(facture: Facture): void {
    if (facture.idFacture === undefined) {
      console.error("ID de la facture non défini.");
      return;
    }
    this.router.navigate(['/edit-finance', facture.idFacture]);
  }
  

  private resetForm(): void {
    this.factureForm.reset();
    this.isEditing = false;
    this.editingFactureId = null;
    this.showAddForm = false;
  }

  toggleStatus(facture: Facture): void {
    const newStatus = facture.status === 'Paid' ? 'Unpaid' : 'Paid';
    this.financeService.updateFactureStatus(facture.idFacture!, newStatus).subscribe(
      updatedFacture => {
        facture.status = updatedFacture.status;
        console.log('Statut mis à jour avec succès:', updatedFacture);
      },
      error => {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    );
  }

sortField: string | null = null;
sortByAmount(field: string): void {
  if (this.sortField === field) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortField = field;
    this.sortDirection = 'asc';
  }

  this.factures.sort((a, b) => {
    const valueA = (a as any)[field];
    const valueB = (b as any)[field];

    if (this.sortDirection === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
}
  
viewFacture(facture: Facture): void {
  this.selectedFacture = facture;
}

closeModal(): void {
  this.selectedFacture = null;
}

printInvoice(): void {
  window.print();
}

generatePDF(): void {
  if (!this.selectedFacture?.idFacture) {
    alert('Veuillez sélectionner une facture valide');
    return;
  }

  this.isGeneratingPdf = true; // Ajoutez cette variable de classe

  this.financeService.generatePdf(this.selectedFacture.idFacture).subscribe({
    next: (pdfBlob: Blob) => {
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Facture_${this.selectedFacture?.idFacture ?? 'unknown'}.pdf`;
      
      // Solution plus fiable pour Firefox
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    },
    error: (err) => {
      console.error(err);
      alert(`Échec du téléchargement: ${err.message || 
            'Veuillez vérifier la console pour les détails'}`);
    },
    complete: () => this.isGeneratingPdf = false
  });
}
}