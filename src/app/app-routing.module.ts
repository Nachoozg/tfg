import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListClasificacionComponent } from './list-clasificacion/list-clasificacion.component';
import { ListPartidosComponent } from './list-partidos/list-partidos.component';
import { ListJugadoresComponent } from './list-jugadores/list-jugadores.component';
import { ListColegiosComponent } from './list-colegios/list-colegios.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'Jugadores', component: ListJugadoresComponent },
  { path: 'Colegios', component: ListColegiosComponent },
  { path: 'Clasificacion', component: ListClasificacionComponent },
  { path: 'Partidos', component: ListPartidosComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
