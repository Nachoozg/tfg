import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { partido } from '../interfaces/partido';
import { PartidoService } from '../services/partido.service';
import { ColegioService } from '../services/colegio.service';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';

@Component({
  selector: 'app-ver-partido',
  standalone: false,
  templateUrl: './ver-partido.component.html',
  styleUrl: './ver-partido.component.css'
})
export class VerPartidoComponent implements OnInit {
  id: number;
  partido: partido | undefined;

  constructor(private aRoute: ActivatedRoute, 
              private dialog: MatDialog,
              private _partidoService: PartidoService,
              private _colegioService: ColegioService ) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    }

  ngOnInit(): void {
    this.getPartido();
  }

  getPartido() {
    this._partidoService.getPartido(this.id).subscribe(data => {
      if (data) {
        this._colegioService.getColegio(data.localId).subscribe(local => {
          this._colegioService.getColegio(data.visitanteId).subscribe(visitante => {
            this.partido = {
              ...data,
              nombreLocal: local?.nombre || "Desconocido",
              nombreVisitante: visitante?.nombre || "Desconocido"
            };
          });
        });
      }
    }, error => {
      console.log("Error al obtener el partido", error);
    });
  }

  viewOnMap() {
    if (!this.partido?.lat || !this.partido?.lng) return;
    this.dialog.open(MapDialogComponent, {
      width: '500px',
      data: {
        lat: this.partido.lat,
        lng: this.partido.lng,
        editable: false
      }
    });
  }
  
}
