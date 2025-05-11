import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { colegio } from '../interfaces/colegio';
import { jugador } from '../interfaces/jugador';
import { JugadorService } from '../services/jugador.service';
import { ColegioService } from '../services/colegio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agregar-editar-jugador',
  standalone: false,
  templateUrl: './agregar-editar-jugador.component.html',
  styleUrls: ['./agregar-editar-jugador.component.css']
})
export class AgregarEditarJugadorComponent implements OnInit {
  listColegios: colegio[] = [];
  agregarJugador: FormGroup;
  accion = 'Agregar';
  id = 0;
  jugador: jugador | undefined;
  archivoSeleccionado: File | null = null;
  imagenPreview: string | null = null;

  constructor(private fb: FormBuilder,
              private _jugadorService: JugadorService,
              private _colegioService: ColegioService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.agregarJugador = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      colegio: ['']
    });
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getColegios();
    this.esEditar();
  }

  getColegios() {
    this._colegioService.getListColegios().subscribe(data => {
      this.listColegios = data;
    }, error => {
      console.log(error);
    });
  }

  esEditar() {
    if (this.id !== 0) {
      this.accion = 'Editar';
      this._jugadorService.getJugador(this.id).subscribe(data => {
        this.jugador = data;
        this.agregarJugador.patchValue({
          nombre: data.nombre,
          apellidos: data.apellidos,
          edad: data.edad,
          colegio: data.colegioId
        });
        if (data.imagenJugador) {
          this.imagenPreview = "https://localhost:44372/" + data.imagenJugador;
        }
      }, error => {
        console.log(error);
      });
    }
  }

  agregarEditarJugador() {
    if (this.archivoSeleccionado) {
      this.uploadImage().subscribe(response => {
        const ruta: string = response.path;
        this.procesarEnvio(ruta);
      }, error => {
        this.toastr.error('Error al subir la imagen', 'Error');
      });
    } else {
      this.procesarEnvio(this.jugador?.imagenJugador ?? null);
    }
  }

  procesarEnvio(rutaImagen: string | null) {
    const edadStr = this.agregarJugador.get('edad')?.value.toString();
    const colegioId = Number(this.agregarJugador.get('colegio')?.value);
  
    if (this.jugador == undefined) {
      const jugador: jugador = {
        nombre: this.agregarJugador.get('nombre')?.value,
        apellidos: this.agregarJugador.get('apellidos')?.value,
        edad: edadStr,
        colegioId: colegioId,
        imagenJugador: rutaImagen ?? undefined
      };
      this._jugadorService.saveJugador(jugador).subscribe(data => {
        this.toastr.success('El jugador fue registrado con éxito', 'Jugador registrado');
        this.router.navigate(['/Jugadores']);
      }, error => {
        this.toastr.error('Opss Ocurrió un error!', 'Error');
        console.log(error);
      });
    } else {
      const jugador: jugador = {
        id: this.jugador.id,
        nombre: this.agregarJugador.get('nombre')?.value,
        apellidos: this.agregarJugador.get('apellidos')?.value,
        edad: edadStr,
        colegioId: colegioId,
        imagenJugador: rutaImagen ?? undefined
      };
      this._jugadorService.updateJugador(this.id, jugador).subscribe(data => {
        this.toastr.success('El jugador se ha actualizado con éxito', 'Jugador actualizado');
        this.router.navigate(['/Jugadores']);
      }, error => {
        this.toastr.error('Opss Ocurrió un error!', 'Error');
        console.log(error);
      });
    }
  }

  onFileSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.archivoSeleccionado = event.target.files[0];
      this.imagenPreview = URL.createObjectURL(this.archivoSeleccionado!);
    }
  }

  uploadImage(): Observable<any> {
    const formData = new FormData();
    if (this.archivoSeleccionado) {
      formData.append('file', this.archivoSeleccionado!);
    }
    return this._jugadorService.uploadImage(formData);
  }
}