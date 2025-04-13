import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { colegio } from '../interfaces/colegio';
import { ColegioService } from '../services/colegio.service';

@Component({
  selector: 'app-ver-colegio',
  standalone: false,
  templateUrl: './ver-colegio.component.html',
  styleUrls: ['./ver-colegio.component.css']
})
export class VerColegioComponent implements OnInit {
  id: number;
  colegio: colegio | undefined;

  constructor(
    private aRoute: ActivatedRoute,
    private _colegioService: ColegioService
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getEquipo();
  }

  getEquipo() {
    this._colegioService.getColegio(this.id).subscribe(data => {
      this.colegio = data;
    });
  }
}