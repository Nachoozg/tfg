import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PartidoService } from '../services/partido.service';
import { ColegioService } from '../services/colegio.service';
import { partido } from '../interfaces/partido';

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
  colegios: any[] = []; // Para almacenar la lista de equipos
  partidoPasado: boolean = false;

  constructor(private fb: FormBuilder,
              private _partidoService: PartidoService,
              private _colegioService: ColegioService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.agregarPartido = this.fb.group({
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      detalles: ['', Validators.required],
      localId: ['', Validators.required],
      visitanteId: ['', Validators.required],
      resultadoLocal: [null],
      resultadoVisitante: [null]
    });   
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.cargarEquipos();
    this.esEditar();
  }

  cargarEquipos() {
    this._colegioService.getListColegios().subscribe(data => {
      this.colegios = data;
    }, error => {
      console.log('Error al cargar equipos', error);
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
          resultadoVisitante: data.resultadoVisitante
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
        this._partidoService.updatePartido(this.id, partido).subscribe(
          (data) => {
            this.toastr.success('El partido fue actualizado con éxito', 'Partido actualizado');
            this.router.navigate(['/Partidos']);
          },
          (error) => {
            this.toastr.error('Ocurrió un error, revisa bien los equipos y la fecha de juego', 'Error');
            console.log(error);
          }
        );
      }
    }
  }
}