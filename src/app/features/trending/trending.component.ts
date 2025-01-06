import { Component, inject } from '@angular/core';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectTrend,
  selectPage as selectCurrentPage,
  selectTotalPages,
} from '../../core/store/trending/selectors';
import * as MovieActions from '../../core/store/trending/actions';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-trending',
  imports: [
    MovieCardComponent,
    AsyncPipe,
    NgxSpinnerModule,
    NgxPaginationModule,
    NgFor,
    NgIf,
  ],
  standalone: true,
  template: `
    <div class="w-[90vw] mx-auto mb-8 mt-[10rem]">
      <h1 class="text-2xl lg:text-3xl font-bold mb-4 text-white">
        Trending Movies
      </h1>
      @defer (when !(loading$ | async)) {
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <ng-container *ngIf="movies()">
          <ng-container
            *ngFor="
              let movie of movies() || []
                | paginate
                  : {
                      itemsPerPage: 20,
                      currentPage: currentPage(),
                      totalItems: totalPages()
                    }
            "
          >
            <app-movie-card [movie]="movie"></app-movie-card>
          </ng-container>
        </ng-container>
      </div>
      <div class="flex justify-center mt-8">
        <pagination-controls
          class="my-pagination rounded"
          (pageChange)="onPageChange($event)"
          [responsive]="true"
          previousLabel="Previous"
          nextLabel="Next"
          screenReaderPaginationLabel="Pagination"
          screenReaderPageLabel="page"
        ></pagination-controls>
      </div>
      }
    </div>
  `,
  styles: [],
})
export class TrendingComponent {
  store = inject(Store);
  spinner = inject(NgxSpinnerService);
  movies = toSignal(this.store.select(selectTrend));
  loading$ = this.store.select(selectLoading);
  currentPage = toSignal(this.store.select(selectCurrentPage), {
    initialValue: 1,
  });
  totalPages = toSignal(this.store.select(selectTotalPages));
  constructor() {
    this.loading$
      .pipe(takeUntilDestroyed())
      .subscribe((isLoading) =>
        isLoading ? this.spinner.show() : this.spinner.hide()
      );
  }

  ngOnInit() {
    this.store.dispatch(
      MovieActions.loadTrendingMovies({ page: this.currentPage() ?? 1 })
    );
  }

  onPageChange(page: number): void {
    // this.currentPage.set(page);
    this.store.dispatch(MovieActions.loadTrendingMovies({ page }));
  }
}
