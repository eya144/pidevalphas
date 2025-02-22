import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../commande.service';
import { Commande } from '../core/models/Commande';

@Component({
  selector: 'app-commande-comptable',
  templateUrl: './commande-comptable.component.html',
  styleUrls: ['./commande-comptable.component.css']
})
export class CommandeComptableComponent implements OnInit {
  commandes: Commande[] = [];

  constructor(
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getAllComm().subscribe(
      (data: Commande[]) => {
        this.commandes = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des commandes', error);
      }
    );
  }

  createFacture(commande: Commande): void {
    // Navigate to the add-finance page with the commande ID and IDResponsableLogistique as query parameters
    this.router.navigate(['/add-finance'], {
      queryParams: {
        idCommande: commande.idCommande,
        idResponsableLogistique: commande.idResponsableLogistique
      }
    });
  }
}