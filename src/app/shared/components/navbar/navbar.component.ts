import { Class } from 'estree';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  template: `
    <nav
      class="fixed inset-0 h-fit z-50 bg-slate-900 backdrop-blur-xl bg-opacity-30"
    >
      <div
        class="lg:w-[95vw] w-[90vw] flex flex-wrap items-center justify-between mx-auto py-4"
      >
        <a
          routerLink="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            class="self-center lg:text-2xl text-xl font-semibold whitespace-nowrap text-white"
            >TMDB</span
          >
        </a>
        <ul class="font-medium flex flex-row lg:gap-4 gap-2 items-center">
          <li>
            <a
              routerLink="/"
              class="block py-2 px-3 text-white md:hover:text-blue-700 md:p-0 "
              aria-current="page"
              >Trending</a
            >
          </li>
          <li class="">
            <a
              routerLink="search"
              class="block p-2 w-10 h-10 text-white bg-blue-700 rounded-lg hover:text-blue-900 cursor-pointer"
              aria-current="page"
            >
              <img class="w-fit" src="/search.svg" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavbarComponent {
  addNavbarBG = false;
}
