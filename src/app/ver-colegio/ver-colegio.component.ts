import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { colegio } from '../interfaces/colegio';
import { ColegioService } from '../services/colegio.service';

@Component({
  selector: 'app-ver-colegio',
  standalone: false,
  templateUrl: './ver-colegio.component.html',
  styleUrl: './ver-colegio.component.css'
})
export class VerColegioComponent implements OnInit {
  id: number;
  colegio: colegio | undefined;
  // partidos: partido[] = [];

  constructor(
    private aRoute: ActivatedRoute,
    private _colegioService: ColegioService
    // private _partidoService: PartidoService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getEquipo();
    // this.getPartidosDelEquipo();
  }

  getEquipo() {
    this._colegioService.getColegio(this.id).subscribe(data => {
      this.colegio = data;
    });
  }

  // getPartidosDelEquipo() {
  //   this._partidoService.getPartidosPorEquipo(this.id).subscribe(data => {
  //     this.partidos = data.map((partido: any) => ({
  //       ...partido,
  //       rivalId: partido.localId === this.id ? partido.visitanteId : partido.localId,
  //       rivalNombre: partido.localId === this.id ? partido.visitanteNombre : partido.localNombre
  //     }));
  //   });
  // }
}
