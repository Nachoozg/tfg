import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PartidoService } from '../services/partido.service';
import { ColegioService } from '../services/colegio.service';
import { partido } from '../interfaces/partido';
import { AuthService } from '../auth/auth.service';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';

interface DialogData {
  fecha?: string;
  id?: number;
}

@Component({
  selector: 'app-modal-partido',
  templateUrl: './modal-partido.component.html',
  styleUrls: ['./modal-partido.component.css'],
  standalone: false
})
export class ModalPartidoComponent implements OnInit {
  agregarPartido: FormGroup;
  colegios: any[] = [];
  accion: string = 'Agregar Partido';
  partidoPasado = false;
  isEditor = false;

  localNombre: string = '';
  visitanteNombre: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalPartidoComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _partidoService: PartidoService,
    private _colegioService: ColegioService,
    public auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditor = this.auth.isAdmin() || this.auth.isArbitro();
    this.agregarPartido = this.fb.group({
      fecha: [data.fecha || '', Validators.required],
      lugar: ['', Validators.required],
      detalles: ['', Validators.required],
      localId: ['', Validators.required],
      visitanteId: ['', Validators.required],
      resultadoLocal:   [{value: null, disabled: true}],
      resultadoVisitante:[{value: null, disabled: true}],
      lat: [null, Validators.required],
      lng: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarEquipos();
    if (this.data.id) {
      this.accion = 'Editar Partido';
      this._partidoService.getPartido(this.data.id).subscribe(p => {
        this.partidoPasado = new Date(p.fecha) < new Date();
        if (this.isEditor && this.partidoPasado) {
          this.agregarPartido.get('resultadoLocal')!.enable();
          this.agregarPartido.get('resultadoVisitante')!.enable();
        }
        this.agregarPartido.patchValue(p);
        this._colegioService.getColegio(p.localId).subscribe(c => this.localNombre = c.nombre);
        this._colegioService.getColegio(p.visitanteId).subscribe(c => this.visitanteNombre = c.nombre);
      });
    }
  }

  cargarEquipos() {
    this._colegioService.getListColegios().subscribe(data => this.colegios = data);
  }

  loadPartido(id: number) {
    this._partidoService.getPartido(id).subscribe(
      (data: partido) => {
        this.agregarPartido.patchValue({
          fecha: data.fecha,
          lugar: data.lugar,
          detalles: data.detalles,
          localId: data.localId,
          visitanteId: data.visitanteId,
          resultadoLocal: data.resultadoLocal,
          resultadoVisitante: data.resultadoVisitante,
        });
        this._colegioService.getColegio(data.localId).subscribe(
          (local) => {
            this.localNombre = local.nombre;
          },
          (error) => {
            console.error('Error al cargar colegio local', error);
          }
        );
        this._colegioService.getColegio(data.visitanteId).subscribe(
          (visitante) => {
            this.visitanteNombre = visitante.nombre;
          },
          (error) => {
            console.error('Error al cargar colegio visitante', error);
          }
        );
      },
      (error) => {
        console.error('Error al cargar partido', error);
      }
    );
  }

  agregarEditarPartido() {
    if (!this.isEditor || this.agregarPartido.invalid) return;
    const partidoData = this.agregarPartido.getRawValue();
    if (this.data.id) {
      partidoData.id = this.data.id;
      this._partidoService.updatePartido(this.data.id, partidoData)
        .subscribe(res => this.dialogRef.close(res));
    } else {
      this._partidoService.savePartido(partidoData)
        .subscribe(res => this.dialogRef.close(res));
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openMapPicker() {
    const ref = this.dialog.open(MapDialogComponent, {
      width: '500px',
      data: {
        lat: this.agregarPartido.value.lat,
        lng: this.agregarPartido.value.lng,
        editable: this.isEditor
      }
    });
    ref.afterClosed().subscribe(coords => {
      if (coords) {
        this.agregarPartido.patchValue(coords);
      }
    });
  }

  viewOnMap() {
    this.dialog.open(MapDialogComponent, {
      width: '500px',
      data: {
        lat: this.agregarPartido.value.lat,
        lng: this.agregarPartido.value.lng,
        editable: false
      }
    });
  }
}
