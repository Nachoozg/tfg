import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartidoService } from '../services/partido.service';
import { ColegioService } from '../services/colegio.service';
import { partido } from '../interfaces/partido';

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

  localNombre: string = '';
  visitanteNombre: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalPartidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private _partidoService: PartidoService,
    private _colegioService: ColegioService
  ) {
    this.agregarPartido = this.fb.group({
      fecha: [data.fecha || '', Validators.required],
      lugar: ['', Validators.required],
      detalles: ['', Validators.required],
      localId: ['', Validators.required],
      visitanteId: ['', Validators.required],
      resultadoLocal: [null],
      resultadoVisitante: [null],
    });
  }

  ngOnInit(): void {
    this.cargarEquipos();
    if (this.data.id) {
      this.accion = 'Editar Partido';
      this.loadPartido(this.data.id);
    }
  }

  cargarEquipos() {
    this._colegioService.getListColegios().subscribe(
      (data) => {
        this.colegios = data;
      },
      (error) => {
        console.error('Error al cargar equipos', error);
      }
    );
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
    if (this.agregarPartido.invalid) return;
    const partidoData: partido = this.agregarPartido.value;

    if (this.data.id) {
      partidoData.id = this.data.id;
      this._partidoService.updatePartido(this.data.id, partidoData).subscribe(
        (data) => {
          this.dialogRef.close(data);
        },
        (error) => {
          console.error('Error al actualizar partido', error);
        }
      );
    } else {
      this._partidoService.savePartido(partidoData).subscribe(
        (data) => {
          this.dialogRef.close(data);
        },
        (error) => {
          console.error('Error al agregar partido', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
