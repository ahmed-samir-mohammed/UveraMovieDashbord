import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, RouterOutlet, NgxSpinnerModule],
  template: `
    <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      type="ball-climbing-dot"
      color="#fff"
    ></ngx-spinner>
    <div
      class="bg-gray-900 backdrop-blur-xl bg-opacity-50 h-screen overflow-y-auto"
    >
      <app-navbar />
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: ``,
})
export class LayoutComponent {}
