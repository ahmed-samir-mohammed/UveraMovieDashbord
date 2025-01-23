import { Component, inject, WritableSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectTrend,
  selectPage as selectCurrentPage,
  selectTotalPages,
} from '../../store/trending/selectors';
import * as MovieActions from '../../store/trending/actions';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, NgxSpinnerModule, NgxPaginationModule],
  template: `
    <section class="trending-movies w-[90vw] mx-auto mb-24 lg:mb-8 mt-[8rem] lg:mt-[10rem]">
      <h1 class="text-2xl lg:text-3xl font-bold mb-4 text-white">
        Trending Movies
      </h1>
      @defer (when !loading()) {
        <div class="movie-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          @if ((movies()?.length ?? 0) > 0) {
            @for (movie of movies() || [] | paginate: {
              itemsPerPage: 20,
              currentPage: currentPage(),
              totalItems: totalPages()
              
            }; track movie.id) {
              <app-movie-card [movie]="movie" />
            }
          }
        </div>
        <nav class="pagination-container flex justify-center mt-8">
          <pagination-controls
            class="my-pagination rounded"
            (pageChange)="onPageChange($event)"
            [responsive]="true"
            previousLabel="Previous"
            nextLabel="Next"
            screenReaderPaginationLabel="Pagination"
            screenReaderPageLabel="page"
          />
        </nav>
      }
    </section>
  `,
})
export class TrendingComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly spinner = inject(NgxSpinnerService);

  protected readonly movies = toSignal(this.store.select(selectTrend));
  protected readonly loading = toSignal(this.store.select(selectLoading));
  protected readonly totalPages = toSignal(this.store.select(selectTotalPages));
  protected readonly currentPage: WritableSignal<number> = signal(1);

  constructor() {
    this.store
      .select(selectCurrentPage)
      .pipe(takeUntilDestroyed())
      .subscribe(page => this.currentPage.set(page));
  }

  ngOnInit(): void {
    if (this.loading()) {
      this.spinner.show();
    } else {
      timer(1000).subscribe(() => this.spinner.hide());
    }

    this.store.dispatch(
      MovieActions.loadTrendingMovies({ page: this.currentPage() ?? 1 })
    );
  }

  protected onPageChange(page: number): void {
    this.currentPage.set(page);
    this.store.dispatch(MovieActions.loadTrendingMovies({ page }));
  }
}
