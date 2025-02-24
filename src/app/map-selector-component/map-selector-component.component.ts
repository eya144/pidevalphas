import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-selector-component',
  templateUrl: './map-selector-component.component.html',
  styleUrls: ['./map-selector-component.component.css']
})
export class MapSelectorComponentComponent implements OnInit {
  @Input() latitude: number = 36.8065;
  @Input() longitude: number = 10.1815;
  @Output() coordinatesChange = new EventEmitter<{ lat: number; lng: number }>();

  private map!: L.Map;
  private marker!: L.Marker;

  ngOnInit(): void {
    this.map = L.map('map').setView([this.latitude, this.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([this.latitude, this.longitude], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.coordinatesChange.emit({ lat: position.lat, lng: position.lng });
    });

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      this.marker.setLatLng([lat, lng]);
      this.coordinatesChange.emit({ lat, lng });
    });
  }

}
