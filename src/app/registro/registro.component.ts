import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { usuario } from "../interfaces/usuario";
import { UsuarioService } from "../services/usuario.service";
import { RolService, Rol } from "../services/rol.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
  standalone: false
})
export class RegistroComponent implements OnInit {
  agregarUsuario: FormGroup;
  roles: Rol[] = [];

  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private _rolService: RolService,
              public router: Router,
              private toastr: ToastrService
             ) {
    this.agregarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confPassword: ['', Validators.required],
      rolId: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this._rolService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: err => console.error("No se han podido cargar los roles", err)
    });
  }

  
  registro() {
    if (this.agregarUsuario.invalid) {
      this.toastr.error('Rellena todos los campos correctamente', 'Error');
      return;
    }

    const { nombre, apellidos, mail, password, confPassword, rolId } = this.agregarUsuario.value;

    if (password !== confPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!pwdRegex.test(password)) {
      this.toastr.error(
        'La contraseña debe tener al menos 8 caracteres, incluir letras, números y un símbolo',
        'Contraseña no válida'
      );
      return;
    }

    const nuevo: usuario = { nombre, apellidos, mail, password, rolId };

    this._usuarioService.registroUsuario(nuevo).subscribe({
      next: () => {
        this.toastr.success('Usuario registrado con éxito', '¡Registro Correcto!');
        this.router.navigate(['/login']);
      },
      error: err => {
        this.toastr.error(err.error || 'Error al registrar', 'Error');
      }
    });
  }
}