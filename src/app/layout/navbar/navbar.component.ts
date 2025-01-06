import { Class } from './../../../../node_modules/@types/estree/index.d';
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
        <div class="flex items-center space-x-4 md:hidden">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-100 rounded-lg  focus:bg-blue-700 focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded="false"
            (click)="addNavbarBG = !addNavbarBG"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <a
            routerLink="search"
            class="block p-2 w-10 h-10 text-white bg-blue-700 rounded-lg hover:text-blue-900 cursor-pointer"
            aria-current="page"
          >
            <img class="w-fit" src="/search.svg" />
          </a>
        </div>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col md:items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0"
          >
            <li>
              <a
                routerLink="/"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 "
                aria-current="page"
                >Trending</a
              >
            </li>
            <li class="hidden md:block">
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
      </div>
    </nav>
  `,
  styles: ``,
})
export class NavbarComponent {
  addNavbarBG = false;
}
