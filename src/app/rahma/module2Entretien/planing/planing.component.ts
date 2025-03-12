import { Component, OnInit } from '@angular/core';
import { DemandeEmploiService } from 'serviceEntretien/demande-emploi.service';

@Component({
  selector: 'app-planing',
  templateUrl: './planing.component.html',
  styleUrls: ['./planing.component.css']
})
export class PlaningComponent implements OnInit {
  currentDate = new Date();
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysInMonth: any[] = [];
  selectedDate: Date | null = null;
  demandes: any[] = [];
  daysWithInterviews: Set<string> = new Set(); 


  constructor(private demandeEmploiService: DemandeEmploiService) {}

  ngOnInit() {
    this.generateCalendar();
    this.fetchDemandesByDate(this.currentDate); 
  }

  generateCalendar() {
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
  
    let days = [];
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push({ date: new Date(firstDay.getFullYear(), firstDay.getMonth(), i - firstDay.getDay() + 1), currentMonth: false });
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i);
      days.push({ date, currentMonth: true, today: this.isToday(date) });
    }
    this.daysInMonth = days;
  
    // Ajoutez un log pour vérifier si les jours sont correctement générés
    console.log("Jours du mois:", this.daysInMonth);
  }
  

  isToday(date: Date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.fetchDemandesByDate(date);
  }

    
  fetchDemandesByDate(date: Date) {
    const formattedDate = date.toISOString().split('T')[0];
    this.demandeEmploiService.getDemandesByDateEntretien(formattedDate)
      .subscribe(
        (response) => {
          this.demandes = response;
          console.log("Demandes reçues:", this.demandes);
          // Marquer les jours qui ont un entretien
          this.daysWithInterviews.clear();
          this.demandes.forEach(demande => {
            console.log("Valeur de entretienDate:", demande.entretienDate); // Ajoutez ce log
            const entretienDate = new Date(demande.entretienDate);
            console.log("Entretien Date parsée:", entretienDate); // Ajoutez ce log
            if (isNaN(entretienDate.getTime())) {
              console.error("Date invalide:", demande.entretienDate);
            } else {
              this.daysWithInterviews.add(entretienDate.toDateString());
            }
          });
  
          // Ajouter la propriété 'hasEntretien' à chaque jour
          this.daysInMonth.forEach(day => {
            day.hasEntretien = this.daysWithInterviews.has(day.date.toDateString());
          });
  
          console.log("Jours avec entretien:", this.daysInMonth.filter(day => day.hasEntretien));
        },
        (error) => {
          console.error('Erreur lors de la récupération des entretiens', error);
        }
      );
  }
}
