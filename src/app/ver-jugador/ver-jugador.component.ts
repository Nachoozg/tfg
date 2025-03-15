import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jugador } from '../interfaces/jugador';
import { colegio } from '../interfaces/colegio';
import { JugadorService } from '../services/jugador.service';
import { ColegioService } from '../services/colegio.service';

@Component({
  selector: 'app-ver-jugador',
  standalone: false,
  templateUrl: './ver-jugador.component.html',
  styleUrl: './ver-jugador.component.css'
})
export class VerJugadorComponent implements OnInit {

  id: number;
  jugador: jugador | undefined;
  colegios: { [id: number]: string } = {};

  constructor( private aRoute: ActivatedRoute, 
               private _jugadorService: JugadorService,
               private _colegioService: ColegioService) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
   }

  ngOnInit(): void {
    this.getJugador();
  }

  getJugador() {
    this._jugadorService.getJugador(this.id).subscribe(data => {
      this.jugador = data;
      this.cargarColegio();
    })
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
  
}
