import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PartidoService } from '../services/partido.service';
import { ColegioService } from '../services/colegio.service';
import esLocale from '@fullcalendar/core/locales/es';
import { partido } from '../interfaces/partido';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  partidos: partido[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    plugins: [dayGridPlugin],
    events: [],
    headerToolbar: {
        left:   'title',
        center: '',
        right:  'prev,next'
    }
  };

  constructor(private _partidoService: PartidoService, private _colegioService: ColegioService) { }

  ngOnInit(): void {
    this.getPartidos();
  }

  getPartidos() {
    this._partidoService.getListPartidos().subscribe(
      (data) => {
        this.partidos = data;
        const eventos: any[] = [];

        // let requests = this.partidos.map(p =>
        //   Promise.all([
        //     this._colegioService.getEquipo(p.localId).toPromise(),
        //     this._colegioService.getEquipo(p.visitanteId).toPromise()
        //   ]).then(([local, visitante]) => {
        //     p.nombreLocal = local?.nombre || "Equipo Local";
        //     p.nombreVisitante = visitante?.nombre || "Equipo Visitante";
        //     eventos.push({
        //       title: `${p.nombreLocal} vs ${p.nombreVisitante}`,
        //       date: p.fecha
        //     });
        //   })
        // );

        // Promise.all(requests).then(() => {
        //   this.calendarOptions.events = eventos;
        // });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
