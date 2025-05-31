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
import { AuthService } from '../auth/auth.service';

interface DateClickArg { dateStr: string; }
interface EventClickArg { event: { id: string }; }

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
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,next'
    },
    dateClick: (arg: DateClickArg) => {
      if (this.auth.isAdmin() || this.auth.isArbitro()) {
        this.openCreateDialog(arg.dateStr);
      } else {
        this.openViewDialogByDate(arg.dateStr);
      }
    },
    eventClick: (arg: EventClickArg) => {
      const id = Number(arg.event.id);
      if (this.auth.isAdmin() || this.auth.isArbitro()) {
        this.openEditDialog(id);
      } else {
        this.openViewDialog(id);
      }
    }
  };

  constructor(
    private _partidoService: PartidoService,
    private _colegioService: ColegioService,
    private dialog: MatDialog,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEventos();
  }

  private loadEventos() {
    this._partidoService.getListPartidos().subscribe(
      partidos => {
        this.partidos = partidos;
        Promise.all(partidos.map((p: partido) =>
          Promise.all([
            this._colegioService.getColegio(p.localId).toPromise(),
            this._colegioService.getColegio(p.visitanteId).toPromise()
          ]).then(([local, visitante]) => ({
            id:    p.id!.toString(),
            title: `${local?.nombre || 'Local'} vs ${visitante?.nombre || 'Visitante'}`,
            date: p.fecha
          }))
        )).then(eventos => {
          this.calendarOptions = {
            ...this.calendarOptions,
            events: eventos
          };
        });
      },
      err => console.error(err)
    );
  }

  private openCreateDialog(fecha: string) {
    const ref = this.dialog.open(ModalPartidoComponent, {
      width: '600px',
      data: { fecha }
    });
    ref.afterClosed().subscribe(ok => { if (ok) this.loadEventos(); });
  }

  private openEditDialog(id: number) {
    const ref = this.dialog.open(ModalPartidoComponent, {
      width: '600px',
      data: { id }
    });
    ref.afterClosed().subscribe(ok => { if (ok) this.loadEventos(); });
  }

  private openViewDialog(id: number) {
    this.dialog.open(ModalPartidoComponent, {
      width: '600px',
      data: { id }
    });
  }

  private openViewDialogByDate(fecha: string) {
    const ts = new Date(fecha).getTime();
    const partido = this.partidos.find(p => p.fecha.getTime() === ts);
    if (partido) {
      this.openViewDialog(partido.id!);
    }
  }
}
