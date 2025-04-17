import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../finance.service';
import { Facture } from 'src/app/core/models/Factures';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import * as QRCode from 'qrcode';
import { ZXingScannerComponent } from '@zxing/ngx-scanner/lib/zxing-scanner.component';
import { BarcodeFormat } from '@zxing/library';
import { ElementRef } from '@angular/core';
import SignaturePad from 'signature_pad';
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


    // Propriétés pour le QR code
    showQR = false;
    showScanner = false;
    qrData = '';


    @ViewChild('scanner')
    scanner!: ZXingScannerComponent;

    @ViewChild('signaturePad', { static: false }) signaturePadElement!: ElementRef;
signaturePad!: SignaturePad;
signatureImg!: string;
    
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
    const valueA = a[field as keyof Facture] as number;
    const valueB = b[field as keyof Facture] as number;
    return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
  });
}
  
viewFacture(facture: Facture): void {
  this.selectedFacture = facture;
  setTimeout(() => {
    this.initSignaturePad();
  }, 100);
}

closeModal(): void {
  this.selectedFacture = null;
}

printInvoice(): void {
  // Créer un clone du contenu à imprimer
  const invoiceContent = document.getElementById('invoice-details')?.cloneNode(true) as HTMLElement;
  
  if (!invoiceContent) return;

  // Ajouter la signature si elle existe
  if (this.signatureImg) {
    const signatureDiv = document.createElement('div');
    signatureDiv.style.marginTop = '50px';
    signatureDiv.style.borderTop = '1px solid #000';
    signatureDiv.style.paddingTop = '20px';
    
    const signatureTitle = document.createElement('h3');
    signatureTitle.textContent = 'Signature';
    
    const signatureImage = document.createElement('img');
    signatureImage.src = this.signatureImg;
    signatureImage.style.maxWidth = '200px';
    
    signatureDiv.appendChild(signatureTitle);
    signatureDiv.appendChild(signatureImage);
    invoiceContent.appendChild(signatureDiv);
  }

  const popupWin = window.open('', '_blank', 'width=800,height=600');
  if (popupWin) {
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .invoice-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .invoice-amounts { margin-top: 20px; }
            .amount-row { display: flex; justify-content: space-between; margin-bottom: 10px; }
            .total { font-weight: bold; font-size: 1.1em; }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${invoiceContent.innerHTML}
        </body>
      </html>
    `);
    popupWin.document.close();
  }
}


exportToExcel(): void {
  this.financeService.exportToExcel().subscribe({
    next: (excelBlob: Blob) => {
      const blobUrl = URL.createObjectURL(excelBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'invoices.xlsx';
      
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    },
    error: (err) => {
      console.error(err);
      alert(`Export failed: ${err.message || 'Please check console for details'}`);
    }
  });
}
allowedFormats = [ BarcodeFormat.QR_CODE ];
 // Méthodes pour le QR code
 showQRCode(): void {
  if (this.selectedFacture) {
    this.qrData = JSON.stringify({
      idFacture: this.selectedFacture.idFacture,
      montant: this.selectedFacture.montantTotal,
      date: this.selectedFacture.dateFacture,
      dateEcheance: this.selectedFacture.dateEcheance,
      tva: this.selectedFacture.tva,
      status: this.selectedFacture.status,
      montantTotalHorsTaxe: this.selectedFacture.montantTotalHorsTaxe,

    });
    
    const canvas = document.getElementById('qrCanvas') as HTMLCanvasElement;
    QRCode.toCanvas(canvas, this.qrData, { width: 200 }, (error) => {
      if (error) console.error(error);
    });
    
    this.showQR = true;
  }
}
 
hideQRCode(): void {
  this.showQR = false;
}



onScanSuccess(result: string): void {
  try {
    const data = JSON.parse(result);
    console.log('QR Code scanned:', data);
    
    // Vous pouvez implémenter ici la logique pour charger la facture scannée
    this.financeService.getFactureById(data.id).subscribe(facture => {
      this.selectedFacture = facture;
      this.stopScanner();
    });
    
  } catch (e) {
    console.error('Invalid QR code', e);
  }
}
// Méthodes pour le scanner
startScanner(): void {
  this.showScanner = true;
}

stopScanner(): void {
  this.showScanner = false;
}
// Initialise le pad de signature
initSignaturePad() {
  const canvas: HTMLCanvasElement = this.signaturePadElement.nativeElement;
  this.signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgb(255, 255, 255)',
    penColor: 'rgb(0, 0, 0)'
  });
}

// Efface la signature
clearSignature() {
  this.signaturePad.clear();
}

// Sauvegarde la signature
saveSignature() {
  if (this.signaturePad.isEmpty()) {
    alert('Please provide a signature first.');
    return;
  }
  
  const signatureData = this.signaturePad.toDataURL('image/png');
  this.signatureImg = signatureData;
  
  // Vous pouvez maintenant inclure cette signature dans l'impression
  alert('Signature saved! You can now print the invoice with the signature.');
}

// Modifiez la méthode printInvoice pour inclure la signature
printInvoices(): void {
  let printContents = document.getElementById('invoice-details')?.innerHTML;
  
  if (!printContents) return;

  // Ajoutez la signature si elle existe
  if (this.signatureImg) {
    printContents += `
      <div style="margin-top: 50px; border-top: 1px solid #000; padding-top: 20px;">
        <h3>Signature</h3>
        <img src="${this.signatureImg}" style="max-width: 200px;"/>
      </div>
    `;
  }

  const popupWin = window.open('', '_blank', 'width=800,height=600');
  if (popupWin) {
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Invoice Print</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .signature-area { margin-top: 50px; }
            .signature-img { max-width: 200px; border-top: 1px solid #000; }
          </style>
        </head>
        <body onload="window.print();window.close()">
          ${printContents}
        </body>
      </html>
    `);
    popupWin.document.close();
  }
}
}