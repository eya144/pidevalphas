import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  template: `
    <canvas #canvas width="400" height="200"></canvas>
    <div>
      <button (click)="clear()">Effacer</button>
      <button (click)="save()">Enregistrer</button>
    </div>
  `,
  styles: [`
    canvas { 
      border: 1px solid #000;
      background: white;
    }
  `]
})
export class SignaturePadComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  signaturePad!: SignaturePad;

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvas.nativeElement, {
      backgroundColor: 'rgb(255, 255, 255)'
    });
  }

  clear() {
    this.signaturePad.clear();
  }

  save() {
    const dataUrl = this.signaturePad.toDataURL();
    // Ici vous pouvez émettre l'URL ou la traiter
    console.log(dataUrl);
  }
}