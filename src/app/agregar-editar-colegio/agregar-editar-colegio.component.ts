import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { colegio } from '../interfaces/colegio';
import { ColegioService } from '../services/colegio.service';

@Component({
  selector: 'app-agregar-editar-colegio',
  standalone: false,
  templateUrl: './agregar-editar-colegio.component.html',
  styleUrl: './agregar-editar-colegio.component.css'
})
export class AgregarEditarColegioComponent implements OnInit {
  agregarColegio: FormGroup;
  accion = 'Agregar';
  id = 0;
  colegio: colegio | undefined;

  constructor(private fb: FormBuilder,
              private _colegioservice: ColegioService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService
              ) {
    this.agregarColegio = this.fb.group({
      nombre: ['', Validators.required],
      numeroJugadores: ['', Validators.required],
    })
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
   }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar(){

    if(this.id !== 0) {
      this.accion = 'Editar';
      this._colegioservice.getColegio(this.id).subscribe(data => {
        this.colegio = data;
        this.agregarColegio.patchValue({
          nombre: data.nombre,
          numeroJugadores: data.numeroJugadores
        })
      }, error => {
        console.log(error);
      })
    }
  }

  agregarEditarEquipo() {

    if(this.colegio == undefined) {

      // Agregamos un nuevo colegio
      const colegio: colegio = {      
        nombre: this.agregarColegio.get('nombre')?.value,
        numeroJugadores: this.agregarColegio.get('numeroJugadores')?.value
      }
      this._colegioservice.saveColegio(colegio).subscribe(data => {
        this.toastr.success('El colegio fue registrado con exito', 'colegio registrado');
        this.router.navigate(['/Colegios']);
      }, error => {
        this.toastr.error('Opss Ocurrio un error!','Error');
        console.log(error);
      })
    } else {

      // Editamos colegio
      const colegio: colegio = {
        id: this.colegio.id,
        nombre: this.agregarColegio.get('nombre')?.value,
        numeroJugadores: this.agregarColegio.get('numeroJugadores')?.value
      }

      this._colegioservice.updateColegio(this.id, colegio).subscribe(data => {
        this.toastr.success('El colegio fue actualizado con exito', 'colegio actualizado');
        this.router.navigate(['/Colegios']);
      }, error => {
        this.toastr.error('Opss Ocurrio un error!','Error');
        console.log(error);
      })
    }


  }
}
