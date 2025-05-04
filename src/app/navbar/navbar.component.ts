import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmacionComponent } from '../modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor(
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  openLogoutConfirm() {
    const ref = this.dialog.open(ModalConfirmacionComponent);
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.auth.logout();
        this.router.navigate(['/']);
      }
    });
  }

}