import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PartidoService } from '../services/partido.service';
import { ColegioService } from '../services/colegio.service';
import { JugadorService } from '../services/jugador.service';
import { partido } from '../interfaces/partido';
import { ClasificacionService } from '../services/clasificacion.service';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { jugador } from '../interfaces/jugador';

@Component({
  selector: 'app-agregar-editar-partido',
  standalone: false,
  templateUrl: './agregar-editar-partido.component.html',
  styleUrl: './agregar-editar-partido.component.css'
})
export class AgregarEditarPartidoComponent implements OnInit {
  agregarPartido: FormGroup;
  accion = 'Agregar';
  id = 0;
  partido: any;
  colegios: any[] = [];
  jugadoresLocal: jugador[] = [];
  jugadoresVisitante: jugador[] = [];
  partidoPasado: boolean = false;

  constructor(private fb: FormBuilder,
              private _partidoService: PartidoService,
              private _colegioService: ColegioService,
              private _clasificacionService: ClasificacionService,
              private router: Router,
              private dialog: MatDialog,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService,
              private _jugadorService: JugadorService) {
    this.agregarPartido = this.fb.group({
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      detalles: ['', Validators.required],
      localId: [null, Validators.required],
      jugadorLocalId: [null, Validators.required],
      visitanteId: [null, Validators.required],
      jugadorVisitanteId: [null, Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      resultadoLocal: [null],
      resultadoVisitante: [null]
    });   
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.cargarEquipos();
    this.colegioJugadores();
    this.esEditar();
  }

  cargarEquipos() {
    this._colegioService.getListColegios().subscribe(data => {
      this.colegios = data;
    }, error => {
      console.log('Error al cargar equipos', error);
    });
  }

  colegioJugadores() {
    this.agregarPartido.get('localId')!.valueChanges
      .subscribe(id => this.loadJugadoresLocal(id));
    this.agregarPartido.get('visitanteId')!.valueChanges
      .subscribe(id => this.loadJugadoresVisitante(id));
  }

  loadJugadoresLocal(colegioId: number) {
    if (!colegioId) {
      this.jugadoresLocal = [];
      return this.agregarPartido.get('jugadorLocalId')!.setValue(null);
    }
    this._jugadorService.getListJugadores()
      .subscribe((all: jugador[]) => {
        this.jugadoresLocal = all.filter((j: jugador) =>
          j.colegioId === +colegioId
        );
        // this.agregarPartido.get('jugadorLocalId')!.setValue(null);
      });
  }

  loadJugadoresVisitante(colegioId: number) {
    if (!colegioId) {
      this.jugadoresVisitante = [];
      return this.agregarPartido.get('jugadorVisitanteId')!.setValue(null);
    }
    this._jugadorService.getListJugadores()
      .subscribe((all: jugador[]) => {
        this.jugadoresVisitante = all.filter((j: jugador) =>
          j.colegioId === +colegioId
        );
        // this.agregarPartido.get('jugadorVisitanteId')!.setValue(null);
      });
  }

  esEditar() {
    if (this.id !== 0) {
      this.accion = 'Editar';
      this._partidoService.getPartido(this.id).subscribe(data => {
        this.partido = data;
        this.agregarPartido.patchValue({
          fecha: data.fecha,
          lugar: data.lugar,
          detalles: data.detalles,
          localId: data.localId,
          visitanteId: data.visitanteId,
          resultadoLocal: data.resultadoLocal,
          resultadoVisitante: data.resultadoVisitante,
          lat: data.lat,
          lng: data.lng
        });
        this.loadJugadoresLocal(data.localId);
        this.loadJugadoresVisitante(data.visitanteId);
        this.agregarPartido.patchValue({
          jugadorLocalId:     data.jugadorLocalId,
          jugadorVisitanteId: data.jugadorVisitanteId
        });
        this.partidoPasado = new Date(data.fecha) < new Date();
      }, error => {
        console.log(error);
      });      
    }
  }


  agregarEditarPartido() {
    if (this.agregarPartido.valid) {
      const partido: partido = {
        fecha: this.agregarPartido.get('fecha')?.value,
        lugar: this.agregarPartido.get('lugar')?.value,
        detalles: this.agregarPartido.get('detalles')?.value,
        localId: this.agregarPartido.get('localId')?.value,
        visitanteId: this.agregarPartido.get('visitanteId')?.value,
        jugadorLocalId: this.agregarPartido.get('jugadorLocalId')!.value,
        jugadorVisitanteId: this.agregarPartido.get('jugadorVisitanteId')!.value,
        lat: this.agregarPartido.value.lat,
        lng: this.agregarPartido.value.lng,
        resultadoLocal: this.agregarPartido.get('resultadoLocal')?.value,
        resultadoVisitante: this.agregarPartido.get('resultadoVisitante')?.value
      };
  
      if (!partido.localId || !partido.visitanteId) {
        this.toastr.error('Por favor seleccione ambos equipos: local y visitante.', 'Campos incompletos');
        return;
      }
  
      if (this.partido === undefined) {
        this._partidoService.savePartido(partido).subscribe(
          (data) => {
            this.toastr.success('El partido fue registrado con éxito', 'Partido registrado');
            this.router.navigate(['/Partidos']);
          },
          (error) => {
            this.toastr.error('Ocurrió un error, revisa bien los equipos y la fecha de juego', 'Error');
            console.log(error);
          }
        );
      } else {
        partido.id = this.partido.id;
        this._partidoService.updatePartido(this.id, partido).subscribe({
          next: () => {
            this.toastr.success('Partido actualizado con éxito', 'OK');
            this._clasificacionService.getClasificacion().subscribe();
            this.router.navigate(['/Partidos']);
          },
          error: err => { /*…*/ }
        });
      }
    }
  }

  openMapPicker() {
    const ref = this.dialog.open(MapDialogComponent, {
      width: '500px',
      data: {
        lat: this.agregarPartido.value.lat,
        lng: this.agregarPartido.value.lng,
        editable: true
      }
    });
    ref.afterClosed().subscribe(coords => {
      if (coords) {
        this.agregarPartido.patchValue(coords);
      }
    });
  }
  
}