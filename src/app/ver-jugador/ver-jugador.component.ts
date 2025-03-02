import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jugador } from '../interfaces/jugador';
import { JugadorService } from '../services/jugador.service';

@Component({
  selector: 'app-ver-jugador',
  standalone: false,
  templateUrl: './ver-jugador.component.html',
  styleUrl: './ver-jugador.component.css'
})
export class VerJugadorComponent implements OnInit {

  id: number;
  jugador: jugador | undefined;

  constructor( private aRoute: ActivatedRoute, 
               private _jugadorService: JugadorService ) {
    this.aRoute.snapshot.paramMap.get('id');
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
   }

  ngOnInit(): void {
    this.getJugador();
  }

  getJugador() {
    this._jugadorService.getJugador(this.id).subscribe(data => {
      this.jugador = data;
    })
  }
}
