import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-dialog',
  standalone: false,
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements AfterViewInit {
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(
    private dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { lat: number; lng: number; editable: boolean }
  ) {}

  ngAfterViewInit(): void {
    const initialLat = this.data.lat || 42.343923;
    const initialLng = this.data.lng || -3.696869;
    this.map = L.map('mapPicker').setView([initialLat, initialLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.data.lat && this.data.lng) {
      this.marker = L.marker([this.data.lat, this.data.lng]).addTo(this.map);
    }

    if (this.data.editable) {
      this.map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([lat, lng]).addTo(this.map);
        this.data.lat = parseFloat(lat.toFixed(6));
        this.data.lng = parseFloat(lng.toFixed(6));
      });
    }
  }

  onSave(): void {
    this.dialogRef.close({ lat: this.data.lat, lng: this.data.lng });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
