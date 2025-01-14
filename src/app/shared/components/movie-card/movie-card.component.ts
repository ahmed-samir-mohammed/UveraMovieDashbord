import { Component, Input } from '@angular/core';
import { Movie } from '../../../core/interface/trend.interface';
import { NgFor, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  template: `
    <div
      class="rounded-xl relative overflow-hidden shadow-lg group cursor-pointer"
      [routerLink]="navigateToDetails()"
    >
      <img
        class="w-full h-full object-cover"
        src="https://image.tmdb.org/t/p/w500/{{ movie.poster_path }}"
        alt="{{ movie.name ? movie.name : movie.title }} Poster"
      />
      <div
        class="px-6 py-4 absolute inset-0 w-full h-full group-hover:bg-slate-800 backdrop-blur-0 group-hover:backdrop-blur-lg group-hover:bg-opacity-25 flex flex-col items-center justify-center transition-all duration-300"
      >
        <div
          class="font-bold text-xl mb-2 text-white text-center translate-y-[200px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          {{ movie.name ? movie.name : movie.title }}
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  navigateToDetails(): string {
    return this.movie ? `/movie/${this.movie.id}` : '/';
  }
}
