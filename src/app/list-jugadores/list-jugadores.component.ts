import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { jugador } from '../interfaces/jugador';
import { colegio } from '../interfaces/colegio';
import { JugadorService } from '../services/jugador.service';
import { ColegioService } from '../services/colegio.service';


@Component({
  selector: 'app-list-jugadores',
  standalone: false,
  templateUrl: './list-jugadores.component.html',
  styleUrl: './list-jugadores.component.css'
})
export class ListJugadoresComponent implements OnInit {
  listJugadores: jugador[] = [];
  // equipos: { [id: number]: string } = {};

  constructor(
    private _jugadorService: JugadorService,
    // private _colegioService: ColegioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getJugadores();
  }

  getJugadores() {
    this._jugadorService.getListJugadores().subscribe(data => {
      this.listJugadores = data;
      // this.cargarEquipos();
    }, error => {
      console.log(error);
    });
  }

  // cargarEquipos() {
  //   this.listJugadores.forEach(jugador => {
  //     if (!this.equipos[jugador.equipoId]) {
  //       this._colegioService.getColegio(jugador.equipoId).subscribe((colegio: colegio) => {
  //         this.equipos[jugador.equipoId] = colegio.nombre;
  //       }, error => {
  //         console.log(error);
  //       });
  //     }
  //   });
  // }

  eliminarJugador(id: any) {
    console.log(id);
    this._jugadorService.deleteJugador(id).subscribe(data => {
      this.getJugadores();
      this.toastr.success('Jugador eliminado con exito', 'Jugador Eliminado');
    }, error => {
      console.log(error);
    });
  }
}
