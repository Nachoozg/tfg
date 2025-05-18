import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jugador } from '../interfaces/jugador';
import { colegio } from '../interfaces/colegio';
import { JugadorService } from '../services/jugador.service';
import { ColegioService } from '../services/colegio.service';
import { JugadorEstadisticas } from '../interfaces/jugador-estadisticas';

@Component({
  selector: 'app-ver-jugador',
  standalone: false,
  templateUrl: './ver-jugador.component.html',
  styleUrls: ['./ver-jugador.component.css']
})
export class VerJugadorComponent implements OnInit {
  id: number;
  jugador: jugador | undefined;
  colegios: { [id: number]: string } = {};

  stats: JugadorEstadisticas = {
    jugadorId: 0,
    partidosJugados: 0,
    victorias: 0,
    derrotas: 0,
    porcentajeVictoria: 0
  };

  constructor(
    private aRoute: ActivatedRoute, 
    private _jugadorService: JugadorService,
    private _colegioService: ColegioService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getJugador();
  }

  getJugador() {
    this._jugadorService.getJugador(this.id).subscribe(data => {
      this.jugador = data;
      this.cargarColegio();
      this.getEstadisticas();
    });
  }

  cargarColegio() {
    if (!this.colegios[this.jugador!.colegioId]) {
      this._colegioService.getColegio(this.jugador!.colegioId).subscribe((colegio: colegio) => {
        this.colegios[this.jugador!.colegioId] = colegio.nombre;
      }, error => {
        console.log(error);
      });
    }
  }

  getEstadisticas() {
    this._jugadorService.getStatsJugador(this.id)
      .subscribe(s => this.stats = s,
                 err => console.error(err));
  }

}