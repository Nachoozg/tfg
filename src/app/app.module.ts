import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';

import { NavbarComponent } from './navbar/navbar.component';
import { ListColegiosComponent } from './list-colegios/list-colegios.component';
import { ListClasificacionComponent } from './list-clasificacion/list-clasificacion.component';
import { ListJugadoresComponent } from './list-jugadores/list-jugadores.component';
import { ListPartidosComponent } from './list-partidos/list-partidos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    ListColegiosComponent,
    ListClasificacionComponent,
    ListJugadoresComponent,
    ListPartidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
