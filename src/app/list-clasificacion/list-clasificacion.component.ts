import { Component, OnInit } from '@angular/core';
import { ClasificacionService } from '../services/clasificacion.service';
import { JugadorService } from '../services/jugador.service';
import { clasificacion } from '../interfaces/clasificacion';
import { jugador } from '../interfaces/jugador';

@Component({
  selector: 'app-list-clasificacion',
  templateUrl: './list-clasificacion.component.html',
  styleUrls: ['./list-clasificacion.component.css'],
  standalone: false
})
export class ListClasificacionComponent implements OnInit {
  clasificacion: clasificacion[] = [];
  jugadores: jugador[] = [];
  modalAbierto: boolean = false;
  colegioModal!: string;

  constructor(
    private clasificacionService: ClasificacionService,
    private jugadorService: JugadorService
  ) {}

  ngOnInit(): void {
    this.actualizarYObtenerClasificacion();
  }

  actualizarYObtenerClasificacion(): void {
    this.clasificacionService.updateClasificacion().subscribe({
      next: () => {
        this.clasificacionService.getClasificacion().subscribe({
          next: (data: clasificacion[]) => {
            this.clasificacion = data;
          },
          error: (err) => {
            console.error('Error al obtener la clasificación:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error al actualizar la clasificación:', err);
      },
    });
  }

  abrirModal(colegioId: number | undefined, nombreColegio: string): void {
    if (colegioId !== undefined) {
      this.jugadorService.getJugadoresPorColegio(colegioId).subscribe({
        next: (data: jugador[]) => {
          this.jugadores = data;
          this.colegioModal = nombreColegio;
          this.modalAbierto = true;
        },
        error: (err) => {
          console.error('Error al obtener los jugadores del colegio:', err);
        },
      });
    }
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.jugadores = [];
  }
}
