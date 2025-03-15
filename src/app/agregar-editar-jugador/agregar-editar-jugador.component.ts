import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { colegio } from '../interfaces/colegio';
import { jugador } from '../interfaces/jugador';
import { JugadorService } from '../services/jugador.service';
import { ColegioService } from '../services/colegio.service';

@Component({
  selector: 'app-agregar-editar-jugador',
  standalone: false,
  templateUrl: './agregar-editar-jugador.component.html',
  styleUrl: './agregar-editar-jugador.component.css'
})
export class AgregarEditarJugadorComponent implements OnInit {
  listColegios: colegio[] = [];
  agregarJugador: FormGroup;
  accion = 'Agregar';
  id = 0;
  jugador: jugador | undefined;

  constructor(private fb: FormBuilder,
              private _jugadorService: JugadorService,
              private _colegioService: ColegioService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService,
              private http: HttpClient
              ) {
    this.agregarJugador = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      colegio: [''],
    })
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

  esEditar(){

    if(this.id !== 0) {
      this.accion = 'Editar';
      this._jugadorService.getJugador(this.id).subscribe(data => {
        this.jugador = data;
        this.agregarJugador.patchValue({
          nombre: data.nombre,
          apellidos: data.apellidos,
          edad: data.edad,
          // colegio: data.colegio,
          colegio: data.colegioId,
        })
      }, error => {
        console.log(error);
      })
    }
  }

  agregarEditarJugador() {

    if(this.jugador == undefined) {
      var id = this.agregarJugador.get('colegio')?.value;
      // Agregamos un nuevo jugador
      const jugador: jugador = {
        nombre: this.agregarJugador.get('nombre')?.value,
        apellidos: this.agregarJugador.get('apellidos')?.value,
        edad: this.agregarJugador.get('edad')?.value,
        colegioId: id
      }
      this._jugadorService.saveJugador(jugador).subscribe(data => {
        this.toastr.success('El jugador fue registrado con exito', 'Jugador registrado');
        this.router.navigate(['/Jugadores']);
      }, error => {
        this.toastr.error('Opss Ocurrio un error!','Error');
        console.log(error);
      })
    } else {

      // Editamos jugador
      const jugador: jugador = {
        id: this.jugador.id,
        nombre: this.agregarJugador.get('nombre')?.value,
        apellidos: this.agregarJugador.get('apellidos')?.value,
        edad: this.agregarJugador.get('edad')?.value,
        colegioId: this.agregarJugador.get('colegio')?.value
      }

      this._jugadorService.updateJugador(this.id, jugador).subscribe(data => {
        this.toastr.success('El jugador se ha actualizado con exito', 'Jugador actualizado');
        this.router.navigate(['/Jugadores']);
      }, error => {
        this.toastr.error('Opss Ocurrio un error!','Error');
        console.log(error);
      })
    }
  }
}
