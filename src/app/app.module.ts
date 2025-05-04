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

import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalPartidoComponent } from './modal-partido/modal-partido.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalConfirmacionComponent } from './modal-confirmacion/modal-confirmacion.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';


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
    VerPartidoComponent,
    ModalPartidoComponent,
    LoginComponent,
    RegistroComponent,
    ModalConfirmacionComponent,
    MapDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FullCalendarModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
