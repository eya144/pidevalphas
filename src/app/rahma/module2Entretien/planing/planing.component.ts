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

  constructor(private demandeEmploiService: DemandeEmploiService) {}

  ngOnInit() {
    this.generateCalendar();
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
        },
        (error) => {
          console.error('Erreur lors de la récupération des entretiens', error);
        }
      );
  }
}
