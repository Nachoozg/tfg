import { Component, OnInit } from '@angular/core';
import { ClasificacionService } from '../services/clasificacion.service';
import { clasificacion } from '../interfaces/clasificacion';

@Component({
  selector: 'app-list-clasificacion',
  templateUrl: './list-clasificacion.component.html',
  styleUrls: ['./list-clasificacion.component.css'],
  standalone: false
})
export class ListClasificacionComponent implements OnInit {
  clasificacion: clasificacion[] = [];

  constructor(private clasifService: ClasificacionService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.clasifService.getClasificacion().subscribe({
      next: data => this.clasificacion = data,
      error: err => console.error('Error cargando clasificación', err)
    });
  }
}
