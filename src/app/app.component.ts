import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(RouterOutlet) outlet?: RouterOutlet;
  title = 'ligaTenis';

  constructor(private router: Router) {}

  get isAuthRoute(): boolean {
    const url = this.router.url;
    return url.startsWith('/login') || url.startsWith('/registro');
  }
}
