import { AsyncPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { TMDBService } from './../../core/services/tmdb.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../core/models/trend.interface';
import { Store } from '@ngrx/store';
import { selectGenresMap } from '../../core/store/genres/selectors';
import { Genres } from '../../core/models/genres.interface';
import * as GenreActions from '../../core/store/genres/actions';
import { MovieDetails } from '../../core/models/movieDetails.interface';
import { finalize, map, Observable, switchMap, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-details',
  imports: [UpperCasePipe, NgIf, AsyncPipe],
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
          class="absolute overflow-y-auto top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-80 z-10 pt-32 lg:pt-8"
        >
          <div
            class="flex flex-col lg:flex-row items-center gap-8 mx-auto w-[90vw] mt-48 mb-16 lg:mb-0 lg:mt-0"
          >
            <div class="lg:w-[60%]">
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

              <div class="mt-4 flex gap-2">
                <p
                  class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                >
                  {{ movie.release_date }}
                </p>
                <p
                  class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                >
                  {{ movie.original_language | uppercase }}
                </p>
                <p
                  class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                >
                  {{ getGenres(movie.genres) }}
                </p>
                <p
                  class="text-gray-300 bg-white bg-opacity-20 py-1 px-3 rounded"
                >
                  {{ movie.popularity }}
                </p>
              </div>
            </div>
            <div class="lg:w-4/12 flex justify-center">
              <img
                class="rounded-lg w-[90%] lg:w-[80%]"
                src="https://image.tmdb.org/t/p/w500{{ movie.poster_path }}"
                [alt]="movie.title"
              />
            </div>
          </div>
        </div>
      </div>
    </ng-container>
    }
  `,
  styles: ``,
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
    switchMap((id) => this.tmdbService.getMovieDetails(id))
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
