import { Component, inject } from '@angular/core';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectTrend,
} from '../../core/store/trending/selectors';
import * as MovieActions from '../../core/store/trending/actions';
import { AsyncPipe } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trending',
  imports: [MovieCardComponent, AsyncPipe, NgxSpinnerModule],
  template: `
    <div class="w-[90vw] mx-auto mb-8 mt-[10rem]">
      <h1 class="text-2xl lg:text-3xl font-bold mb-4 text-white">
        Trending Movies
      </h1>
      @defer (when !(loading$ | async)) {
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        @for (movie of movies$ | async; track $index) {
        <app-movie-card [movie]="movie"></app-movie-card>
        }
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class TrendingComponent {
  store = inject(Store);
  movies$ = this.store.select(selectTrend);
  loading$ = this.store.select(selectLoading);
  spinner = inject(NgxSpinnerService);
  constructor() {}
  ngOnInit() {
    this.store
      .select(selectLoading)
      .subscribe((isLoading) =>
        isLoading ? this.spinner.show() : this.spinner.hide()
      );

    this.store.dispatch(MovieActions.loadTrendingMovies());
  }
}
