import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgxSpinnerModule],
  template: `
    <ngx-spinner
      bdColor="rgba(0, 0, 0, 0.8)"
      type="ball-climbing-dot"
      color="#fff"
    ></ngx-spinner>
    <div
      class="bg-gray-900 backdrop-blur-xl bg-opacity-50 pt-24 min-h-screen"
    >
      <app-navbar />
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    initFlowbite();
  }
}
