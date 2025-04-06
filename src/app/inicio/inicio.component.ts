import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { partido } from '../interfaces/partido';
import { PartidoService } from '../services/partido.service';
import { ColegioService } from '../services/colegio.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalPartidoComponent } from '../modal-partido/modal-partido.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: false
})
export class InicioComponent implements OnInit {
  partidos: partido[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    plugins: [dayGridPlugin, interactionPlugin],
    eventColor: 'rgb(151, 255, 109)',
    eventTextColor: 'black',
    events: [],
    dateClick: (arg: any) => this.openCreateDialog(arg.dateStr),
    eventClick: (arg: any) => this.openEditDialog(arg.event.id),
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next'
    }
  } as any;

  constructor(
    private _partidoService: PartidoService,
    private _colegioService: ColegioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPartidos();
  }

  getPartidos() {
    this._partidoService.getListPartidos().subscribe(
      (data) => {
        this.partidos = data;
        const eventos: any[] = [];
        let requests = this.partidos.map(p =>
          Promise.all([
            this._colegioService.getColegio(p.localId).toPromise(),
            this._colegioService.getColegio(p.visitanteId).toPromise()
          ]).then(([local, visitante]) => {
            p.nombreLocal = local?.nombre || "Equipo Local";
            p.nombreVisitante = visitante?.nombre || "Equipo Visitante";
            eventos.push({
              id: p.id,
              title: `${p.nombreLocal} vs ${p.nombreVisitante}`,
              date: p.fecha
            });
          })
        );

        Promise.all(requests).then(() => {
          this.calendarOptions.events = eventos;
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openCreateDialog(fecha: string) {
    const dialogRef = this.dialog.open(ModalPartidoComponent, {
      width: '600px',
      data: { fecha: fecha }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartidos();
      }
    });
  }

  openEditDialog(id: any) {
    const partidoId = Number(id);
    const dialogRef = this.dialog.open(ModalPartidoComponent, {
      width: '600px',
      data: { id: partidoId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPartidos();
      }
    });
  }
}