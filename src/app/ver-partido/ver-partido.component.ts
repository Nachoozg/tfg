import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { partido } from '../interfaces/partido';
import { PartidoService } from '../services/partido.service';
import { ColegioService } from '../services/colegio.service';

@Component({
  selector: 'app-ver-partido',
  standalone: false,
  templateUrl: './ver-partido.component.html',
  styleUrl: './ver-partido.component.css'
})
export class VerPartidoComponent implements OnInit {
  id: number;
  partido: partido | undefined;

  constructor( private aRoute: ActivatedRoute, 
               private _partidoService: PartidoService,
               private _colegioService: ColegioService ) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    }

  ngOnInit(): void {
    this.getPartido();
  }

  getPartido() {
    this._partidoService.getPartido(this.id).subscribe({
      next: (data) => {
        if (data) {
          console.log('Partido recibido:', data);
          // Asignamos directamente el partido
          this.partido = data;
  
          // (Comentamos todo lo referente a local/visitante)
          // this._colegioService.getColegio(data.localId).subscribe(local => {
          //   this._colegioService.getColegio(data.visitanteId).subscribe(visitante => {
          //     this.partido = {
          //       ...data,
          //       nombreLocal: local?.nombre || 'Desconocido',
          //       nombreVisitante: visitante?.nombre || 'Desconocido'
          //     };
          //   });
          // });
        }
      },
      error: (error) => {
        console.log('Error al obtener el partido', error);
      }
    });
  }  
}
