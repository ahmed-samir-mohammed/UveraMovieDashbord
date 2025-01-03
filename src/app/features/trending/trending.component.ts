import { Component, inject } from '@angular/core';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { Store } from '@ngrx/store';
import { selectLoading, selectMovies } from '../../core/store/selectors';
import * as MovieActions from '../../core/store/actions';
import { AsyncPipe } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trending',
  imports: [MovieCardComponent, AsyncPipe, NgxSpinnerModule],
  template: `
    <div class="w-[90vw] mx-auto">
      @defer { @if (!(loading$ | async)) {
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        @for (movie of movies$ | async; track $index) {
        <app-movie-card [movie]="movie"></app-movie-card>
        }
      </div>
      }}
    </div>
  `,
  styles: ``,
})
export class TrendingComponent {
  store = inject(Store);
  movies$ = this.store.select(selectMovies);
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
