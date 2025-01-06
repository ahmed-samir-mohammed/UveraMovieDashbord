import { AsyncPipe, DecimalPipe, NgIf } from '@angular/common';
import { TMDBService } from './../../core/services/tmdb.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectGenresMap } from '../../store/genres/selectors';
import { Genres } from '../../core/models/genres.interface';
import * as GenreActions from '../../store/genres/actions';
import { MovieDetails } from '../../core/models/movieDetails.interface';
import {
  finalize,
  map,
  Observable,
  switchMap,
  tap,
  catchError,
  of,
  timer,
} from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-details',
  imports: [NgIf, AsyncPipe, DecimalPipe],
  standalone: true,
  template: `
    @defer {
    <ng-container *ngIf="movie$ | async as movie">
      <div
        class="relative flex flex-col md:flex-row gap-6 items-start w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat"
        style="background-image: url('https://image.tmdb.org/t/p/original{{
          movie.backdrop_path
        }}');"
      >
        <div
          class="absolute overflow-y-auto top-0 left-0 w-full h-full flex items-start bg-black bg-opacity-80 z-10"
        >
          <div
            class="flex flex-col items-start gap-8 mx-auto w-[90vw] mb-16 mt-[8rem] lg:mt-[10rem]"
          >
            <div class="flex w-full flex-col lg:flex-row lg:items-center">
              <div class="lg:w-[60%] order-2 lg:order-1">
                <div class="flex justify-between items-center">
                  <h1 class="text-4xl font-bold text-white mb-4">
                    {{ movie.title }}
                  </h1>
                  <div class="bg-amber-500 text-black py-2 px-4 rounded">
                    {{ movie.vote_average.toFixed(1) }}
                  </div>
                </div>
                <p class="italic text-gray-300">{{ movie.original_title }}</p>
                <div class="flex gap-2 mt-2">
                  <span
                    *ngIf="movie.adult"
                    class="px-2 py-1 bg-red-500 text-white text-xs rounded"
                  >
                    Adults Only
                  </span>
                </div>
                <p class="text-gray-300 mt-4">{{ movie.overview }}</p>

                <!-- Movie Details -->
                <div class="mt-4 flex flex-wrap gap-2">
                  @if (movie.release_date ) {
                  <p
                    class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                  >
                    {{ movie.release_date }}
                  </p>
                  } @if (movie.spoken_languages.length > 0 ) {
                  <p
                    class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                  >
                    @for (lang of movie.spoken_languages; track $index) {
                    <span>
                      {{ lang.name }}
                      @if ($index < movie.spoken_languages.length - 1) {
                      <span>,</span>
                      }
                    </span>
                    }
                  </p>
                  } @if (movie.genres.length > 0 ) {
                  <p
                    class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                  >
                    {{ getGenres(movie.genres) }}
                  </p>
                  } @if (movie.popularity ) {
                  <p
                    class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                  >
                    <strong>Popularity:</strong>
                    {{ movie.popularity }}
                  </p>
                  } @if (movie.budget ) {
                  <p
                    class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                  >
                    <strong>Budget:</strong>
                    $ {{ movie.budget | number }}
                  </p>
                  } @if (movie.revenue ) {

                  <p
                    class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                  >
                    <strong>Revenue:</strong>
                    $ {{ movie.revenue | number }}
                  </p>
                  } @if (movie.belongs_to_collection ) {
                  <p
                    class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                  >
                    <strong>Collection:</strong>
                    {{ movie.belongs_to_collection.name }}
                  </p>
                  }
                </div>
                <!-- Video Links -->
                @if ( movie.videos.results.length > 0 ){
                <div class="w-full mb-8 mt-4">
                  <h3 class="text-xl text-white mb-2">Videos</h3>
                  <div
                    class="flex flex-row flex-wrap gap-2 max-h-[15rem] overflow-y-auto scrollbar-hide"
                  >
                    @for (video of movie.videos.results; track $index) {
                    <a
                      [href]="'https://www.youtube.com/watch?v=' + video.key"
                      target="_blank"
                      class=" text-white bg-white bg-opacity-20 h-fit hover:bg-blue-700 rounded-lg py-1 px-2"
                    >
                      {{ video.name }}
                    </a>
                    }
                  </div>
                </div>
                }
              </div>
              <!-- Movie Poster -->
              <div
                class="lg:w-4/12 flex justify-center lg:justify-end order-1 mb-8 lg:order-2"
              >
                <img
                  class="rounded-lg w-[90%] md:w-[50%] lg:w-[80%]"
                  src="https://image.tmdb.org/t/p/w500{{ movie.poster_path }}"
                  [alt]="movie.title"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
    }
  `,
  styles: `
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }

    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
})
export class MovieDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  tmdbService = inject(TMDBService);
  store = inject(Store);
  spinner = inject(NgxSpinnerService);
  genresMap$ = this.store.select(selectGenresMap);
  id!: string;
  movie$ = this.route.params.pipe(
    map((params) => +params['id']),
    tap(() => this.spinner.show()),
    switchMap((id) =>
      this.getMovieDetails(id).pipe(
        finalize(() => {
          timer(1000).subscribe(() => this.spinner.hide());
        }),
        catchError((err) => {
          console.error(err);
          this.spinner.hide();
          return of(null);
        })
      )
    )
  );
  constructor() {}

  ngOnInit(): void {
    this.store.dispatch(GenreActions.loadGenres());
  }

  private getMovieDetails(id: number | string): Observable<MovieDetails> {
    return this.tmdbService.getMovieDetails(id);
  }

  getGenres(genre: Genres[]): string {
    let genresList: Genres[] = [];
    this.genresMap$.subscribe((genresMap) => {
      genresList = genre.map((genre) => genresMap[genre.id] || 'Unknown');
    });
    return genresList.join(', ');
  }
}
