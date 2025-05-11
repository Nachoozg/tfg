import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map }          from 'rxjs/operators';
import { ClasificacionService } from '../services/clasificacion.service';
import { PartidoService }       from '../services/partido.service';
import { ColegioService }       from '../services/colegio.service';
import { clasificacion }        from '../interfaces/clasificacion';
import { partido }              from '../interfaces/partido';

type FilaClasificacion = clasificacion & {
  ultimos5: ('G'|'P'|'?')[];
  porcentajeVictorias: number;
};

@Component({
  selector: 'app-list-clasificacion',
  templateUrl: './list-clasificacion.component.html',
  styleUrls: ['./list-clasificacion.component.css'],
  standalone: false
})
export class ListClasificacionComponent implements OnInit {
  clasificacion: FilaClasificacion[] = [];
  selectedTeamId: number | null = null;
  partidosEquipo: Array<partido & { localNombre: string; visitanteNombre: string }> = [];

  constructor(
    private clasifService:  ClasificacionService,
    private partidoService: PartidoService,
    private colegioService: ColegioService
  ) {}

  ngOnInit(): void {
    this.clasifService.getClasificacion().subscribe({
      next: data => {
        this.clasificacion = (data as clasificacion[]).map(f => {
          const total = f.victorias + f.derrotas;
          const pct = total > 0
            ? Math.round((f.victorias * 100) / total)
            : 0;
          return {
            ...f,
            ultimos5: [],
            porcentajeVictorias: pct
          };
        });
        this.cargarUltimos5();
      },
      error: err => console.error('Error cargando clasificación', err)
    });
  }

  private cargarUltimos5(): void {
    this.partidoService.getListPartidos().subscribe({
      next: partidos => {
        const ordenados = (partidos as partido[])
          .sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

        this.clasificacion.forEach(fila => {
          const jugados = ordenados
            .filter(p => p.localId === fila.equipoId || p.visitanteId === fila.equipoId)
            .slice(0,5);

          fila.ultimos5 = jugados.map(p => {
            if (p.resultadoLocal == null || p.resultadoVisitante == null) {
              return '?';
            }
            const local = p.resultadoLocal!;
            const visit = p.resultadoVisitante!;
            return (p.localId === fila.equipoId)
              ? (local > visit ? 'G' : 'P')
              : (visit > local ? 'G' : 'P');
          });
        });
      },
      error: err => console.error('Error cargando partidos', err)
    });
  }

  alternarFila(equipoId: number): void {
    if (this.selectedTeamId === equipoId) {
      this.selectedTeamId = null;
      this.partidosEquipo = [];
    } else {
      this.selectedTeamId = equipoId;
      this.cargarPartidosEquipo(equipoId);
    }
  }

  private cargarPartidosEquipo(equipoId: number): void {
    this.partidoService.getListPartidos().subscribe({
      next: (todos: partido[]) => {
        const jugados = todos
          .filter(p => p.localId === equipoId || p.visitanteId === equipoId)
          .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  
        const detalles$ = jugados.map(p =>
          forkJoin({
            local:     this.colegioService.getColegio(p.localId),
            visitante: this.colegioService.getColegio(p.visitanteId)
          }).pipe(
            map(res => ({
              ...p,
              localNombre:     res.local.nombre,
              visitanteNombre: res.visitante.nombre
            }))
          )
        );
        forkJoin(detalles$).subscribe({
          next: full => this.partidosEquipo = full,
          error: err  => console.error('Error cargando detalles de partidos', err)
        });
      },
      error: err => console.error('Error cargando partidos', err)
    });
  }
  
}
