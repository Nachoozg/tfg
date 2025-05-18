import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { colegio } from '../interfaces/colegio';
import { ColegioService } from '../services/colegio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agregar-editar-colegio',
  standalone: false,
  templateUrl: './agregar-editar-colegio.component.html',
  styleUrls: ['./agregar-editar-colegio.component.css']
})
export class AgregarEditarColegioComponent implements OnInit {
  agregarColegio: FormGroup;
  accion = 'Agregar';
  id = 0;
  colegio: colegio | undefined;
  archivoSeleccionado: File | null = null;
  imagenPreview: string | null = null;

  constructor(private fb: FormBuilder,
              private _colegioservice: ColegioService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.agregarColegio = this.fb.group({
      nombre: ['', Validators.required],
      numeroJugadores: [{ value: null, disabled: true }],
    });
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar() {
    if (this.id !== 0) {
      this.accion = 'Editar';
      this._colegioservice.getColegio(this.id).subscribe(data => {
        this.colegio = data;
        this.agregarColegio.patchValue({
          nombre: data.nombre,
          numeroJugadores: data.numeroJugadores
        });
        if(data.imagenColegio) {
          this.imagenPreview = "https://localhost:44372/" + data.imagenColegio;
        }
      }, error => {
        console.log(error);
      });
    }
  }

  agregarEditarEquipo() {
    if (this.archivoSeleccionado) {
      this.uploadImage().subscribe(response => {
        const ruta: string = response.path;
        this.procesarEnvio(ruta);
      }, error => {
        this.toastr.error('Error al subir la imagen', 'Error');
      });
    } else {
      this.procesarEnvio(this.colegio?.imagenColegio ?? null);
    }
  }

  procesarEnvio(rutaImagen: string | null) {
    const numeroJugadores = Number(this.agregarColegio.get('numeroJugadores')?.value);
    if (this.colegio == undefined) {
      const colegio: colegio = {
        nombre: this.agregarColegio.get('nombre')?.value,
        numeroJugadores: numeroJugadores,
        imagenColegio: rutaImagen ?? undefined
      };

      this._colegioservice.saveColegio(colegio).subscribe(data => {
        this.toastr.success('El colegio fue registrado con éxito', 'Colegio registrado');
        this.router.navigate(['/Colegios']);
      }, error => {
        this.toastr.error('Opss Ocurrió un error!', 'Error');
        console.log(error);
      });
    } else {
      const colegio: colegio = {
        id: this.colegio.id,
        nombre: this.agregarColegio.get('nombre')?.value,
        numeroJugadores: numeroJugadores,
        imagenColegio: rutaImagen ?? undefined
      };

      this._colegioservice.updateColegio(this.id, colegio).subscribe(data => {
        this.toastr.success('El colegio fue actualizado con éxito', 'Colegio actualizado');
        this.router.navigate(['/Colegios']);
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
    return this._colegioservice.uploadImage(formData);
  }
}