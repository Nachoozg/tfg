import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { colegio } from '../interfaces/colegio';
import { ColegioService } from '../services/colegio.service';

@Component({
  selector: 'app-list-colegios',
  standalone: false,
  templateUrl: './list-colegios.component.html',
  styleUrl: './list-colegios.component.css'
})
export class ListColegiosComponent implements OnInit {

  listColegios: colegio[] = [];

  constructor(
    private _colegioService: ColegioService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getColegios();
  }

  getColegios() {
    this._colegioService.getListColegios().subscribe(data => {
      this.listColegios = data;
    }, error => {
      console.log(error);
    });
  }

  eliminarColegio(id: any) {
    console.log(id);
    this._colegioService.deleteColegio(id).subscribe(data => {
      this.getColegios();
      this.toastr.success('Colegio Eliminado con exito', 'Registro Eliminado');
    }, error => {
      console.log(error);
    });
  }
}