import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(RouterOutlet) outlet?: RouterOutlet;
  title = 'ligaTenis';

  get isAuthRoute(): boolean {
    const path = this.outlet
                  ?.activatedRoute
                  ?.snapshot
                  ?.routeConfig
                  ?.path;
    return path === 'login' || path === 'registro';
  }
}
