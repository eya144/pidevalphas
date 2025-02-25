import { Component } from '@angular/core';
import { VehiculeService } from 'serviceLogistique/vehicule.service';

@Component({
  selector: 'app-affect-vehicule',
  templateUrl: './affect-vehicule.component.html',
  styleUrls: ['./affect-vehicule.component.css']
})
export class AffectVehiculeComponent {
chauffeur:number[] = [
  2,3,4,5,7,8,9
]
vehicules: any[] = [];

constructor(private vehiculeService: VehiculeService) {}

ngOnInit() {
  this.getVehicules();
}

getVehicules(): void {
  this.vehiculeService.getVehicule().subscribe(data => {
    this.vehicules = data;
  });
}

}
