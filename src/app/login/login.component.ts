import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { usuario } from "../interfaces/usuario";
import { ToastrService } from "ngx-toastr";
import { UsuarioService } from "../services/usuario.service";
import { AuthService, User } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private auth: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  iniciarSesion() {
    if (this.loginForm.invalid) {
      this.toastr.error('Rellena todos los campos correctamente', 'Error');
      return;
    }

    console.log('🟢 llamando a login…');
    const { mail, password } = this.loginForm.value;

    this.usuarioService.login({ mail, password }).subscribe({
      next: (res: any) => {
        console.log('✅ login OK, payload=', res);
        const user: User = {
          id: res.user.id,
          nombre: res.user.nombre,
          mail: res.user.mail,
          rol: res.user.rolNombre.toLowerCase(),
        };
        this.auth.login(user);
        this.toastr.success('¡Bienvenido, ' + user.nombre + '!');
        this.router.navigate(['/']);
      },
      error: err => {
        this.toastr.error(err.error || 'Error al iniciar sesión', 'Error');
      }
    });
  }
}
