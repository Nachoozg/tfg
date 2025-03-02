import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListClasificacionComponent } from './list-clasificacion/list-clasificacion.component';
import { ListPartidosComponent } from './list-partidos/list-partidos.component';
import { ListJugadoresComponent } from './list-jugadores/list-jugadores.component';
import { ListColegiosComponent } from './list-colegios/list-colegios.component';
import { AgregarEditarColegioComponent } from './agregar-editar-colegio/agregar-editar-colegio.component';
import { VerColegioComponent } from './ver-colegio/ver-colegio.component';
import { VerJugadorComponent } from './ver-jugador/ver-jugador.component';
import { AgregarEditarJugadorComponent } from './agregar-editar-jugador/agregar-editar-jugador.component';
import { VerPartidoComponent } from './ver-partido/ver-partido.component';
import { AgregarEditarPartidoComponent } from './agregar-editar-partido/agregar-editar-partido.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'Jugadores', component: ListJugadoresComponent },
  { path: 'Colegios', component: ListColegiosComponent },
  { path: 'Clasificacion', component: ListClasificacionComponent },
  { path: 'Partidos', component: ListPartidosComponent },
  { path: 'agregarColegio', component: AgregarEditarColegioComponent },
  { path: 'editarColegio/:id', component: AgregarEditarColegioComponent },
  { path: 'verColegio/:id', component: VerColegioComponent },
  { path: 'agregarJugador', component: AgregarEditarJugadorComponent },
  { path: 'editarJugador/:id', component: AgregarEditarJugadorComponent },
  { path: 'verJugador/:id', component: VerJugadorComponent },
  { path: 'agregarPartido', component: AgregarEditarPartidoComponent },
  { path: 'editarPartido/:id', component: AgregarEditarPartidoComponent },
  { path: 'verPartido/:id', component: VerPartidoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
