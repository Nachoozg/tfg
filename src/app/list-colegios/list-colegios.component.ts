import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { colegio } from '../interfaces/colegio';
import { ColegioService } from '../services/colegio.service';
import { JugadorService } from '../services/jugador.service';

@Component({
  selector: 'app-list-colegios',
  standalone: false,
  templateUrl: './list-colegios.component.html',
  styleUrl: './list-colegios.component.css'
})
export class ListColegiosComponent implements OnInit {

  // listColegios: colegio[] = [];
  // jugadores: jugador[] = []; // Para almacenar la lista de jugadores

  // constructor(
  //   private _colegioService: ColegioService,
  //   // private _jugadorService: JugadorService, // Inyectamos el servicio de jugadores
  //   private toastr: ToastrService
  // ) { }

  ngOnInit(): void {
    // this.getEquipos();
    // this.getJugadores(); // Obtener los jugadores al iniciar el componente
  }

  // // Obtener la lista de equipos
  // getEquipos() {
  //   this._colegioService.getListColegios().subscribe(data => {
  //     this.listColegios = data;
  //     // this.actualizarNumeroJugadores(); // Actualizamos el número de jugadores después de obtener los equipos
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // // Obtener la lista de jugadores
  // getJugadores() {
  //   this._jugadorService.getListJugadores().subscribe(data => {
  //     this.jugadores = data;
  //     this.actualizarNumeroJugadores(); // Actualizamos los equipos con el número correcto de jugadores
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // Contar los jugadores asignados a cada equipo
  // actualizarNumeroJugadores() {
  //   this.listColegios.forEach(equipo => {
  //     // Contamos cuántos jugadores están asignados a este equipo
  //     equipo.numeroJugadores = this.jugadores.filter(jugador => jugador.equipoId === equipo.id).length;
  //   });
  // }

  // // Eliminar equipo
  // eliminarEquipo(id: any) {
  //   console.log(id);
  //   this._colegioService.deleteColegio(id).subscribe(data => {
  //     this.getEquipos();
  //     this.toastr.success('Equipo Eliminado con exito', 'Registro Eliminado');
  //   }, error => {
  //     console.log(error);
  //   });
  // }
}