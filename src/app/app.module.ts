import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ToastrModule } from 'ngx-toastr';

import { NavbarComponent } from './navbar/navbar.component';
import { ListColegiosComponent } from './list-colegios/list-colegios.component';
import { ListClasificacionComponent } from './list-clasificacion/list-clasificacion.component';
import { ListJugadoresComponent } from './list-jugadores/list-jugadores.component';
import { ListPartidosComponent } from './list-partidos/list-partidos.component';

import { HttpClientModule } from '@angular/common/http';
import { AgregarEditarColegioComponent } from './agregar-editar-colegio/agregar-editar-colegio.component';
import { VerColegioComponent } from './ver-colegio/ver-colegio.component';
import { VerJugadorComponent } from './ver-jugador/ver-jugador.component';
import { AgregarEditarJugadorComponent } from './agregar-editar-jugador/agregar-editar-jugador.component';
import { AgregarEditarPartidoComponent } from './agregar-editar-partido/agregar-editar-partido.component';
import { VerPartidoComponent } from './ver-partido/ver-partido.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    ListColegiosComponent,
    ListClasificacionComponent,
    ListJugadoresComponent,
    ListPartidosComponent,
    AgregarEditarColegioComponent,
    VerColegioComponent,
    VerJugadorComponent,
    AgregarEditarJugadorComponent,
    AgregarEditarPartidoComponent,
    VerPartidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
