import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { jugador } from '../interfaces/jugador';
import { partido } from '../interfaces/partido';
import { PartidoService } from '../services/partido.service';
import { JugadorService } from '../services/jugador.service';

@Component({
  selector: 'app-list-partidos',
  standalone: false,
  templateUrl: './list-partidos.component.html',
  styleUrl: './list-partidos.component.css'
})
export class ListPartidosComponent implements OnInit {

  listPartidos: partido[] = [];
  jugadores: jugador[] = []; // Para almacenar la lista de jugadores

  constructor(
    private _partidoService: PartidoService,
    private _jugadorService: JugadorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPartidos();
  }

  getPartidos() {
    this._partidoService.getListPartidos().subscribe(data => {
      this.listPartidos = data;
    }, error => {
      console.log(error);
    });
  }

  eliminarPartido(id: any) {
    console.log(id);
    this._partidoService.deletePartido(id).subscribe(data => {
      this.getPartidos();
      this.toastr.success('Partido Eliminado con exito', 'Registro Eliminado');
    }, error => {
      console.log(error);
    });
  }

}
