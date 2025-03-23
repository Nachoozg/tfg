import { Component, OnInit } from '@angular/core';
import { PartidoService } from '../services/partido.service';
import { partido } from '../interfaces/partido';
import { clasificacion } from '../interfaces/clasificacion';

@Component({
  selector: 'app-list-clasificacion',
  standalone: false,
  templateUrl: './list-clasificacion.component.html',
  styleUrls: ['./list-clasificacion.component.css'],
})
export class ListClasificacionComponent implements OnInit {
  clasificacion: clasificacion[] = [];

  constructor(private partidoService: PartidoService) {}

  ngOnInit(): void {
    this.getPartidos();
  }

  getPartidos(): void {
    this.partidoService.getListPartidos().subscribe({
      next: (partidos: partido[]) => {
        this.calcularClasificacion(partidos);
      },
      error: (err) => {
        console.error('Error al obtener la lista de partidos:', err);
      },
    });
  }

  calcularClasificacion(partidos: partido[]): void {
    const mapClasificacion = new Map<number, clasificacion>();

    for (const partido of partidos) {
      const localId = partido.localId;
      const visitanteId = partido.visitanteId;
      const resLocal = partido.resultadoLocal;
      const resVisitante = partido.resultadoVisitante;

      if (!mapClasificacion.has(localId)) {
        mapClasificacion.set(localId, {
          equipo: localId,
          partidosJugados: 0,
          victorias: 0,
          derrotas: 0,
          puntos: 0,
        });
      }
      if (!mapClasificacion.has(visitanteId)) {
        mapClasificacion.set(visitanteId, {
          equipo: visitanteId,
          partidosJugados: 0,
          victorias: 0,
          derrotas: 0,
          puntos: 0,
        });
      }

      if (resLocal != null && resVisitante != null) {
        const localData = mapClasificacion.get(localId)!;
        const visitanteData = mapClasificacion.get(visitanteId)!;

        localData.partidosJugados++;
        visitanteData.partidosJugados++;

        if (resLocal > resVisitante) {
          localData.victorias++;
          visitanteData.derrotas++;
          localData.puntos += 2;
          visitanteData.puntos += 1;
        } else if (resLocal < resVisitante) {
          visitanteData.victorias++;
          localData.derrotas++;
          visitanteData.puntos += 2;
          localData.puntos += 1;
        }
      }
    }

    this.clasificacion = Array.from(mapClasificacion.values());
    this.clasificacion.sort((a, b) => b.puntos - a.puntos);
  }
}
