import { TMDBService } from './../../core/services/tmdb.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCountriesMap } from '../../store/countries/selectors';
import * as CountriesActions from '../../store/countries/actions';
import { NgFor } from '@angular/common';
import { Movie } from '../../core/models/trend.interface';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { finalize, tap, timer } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { OnlyNumbersDirective } from '../../core/directives/only-numbers.directive';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MovieCardComponent,
    NgxSpinnerModule,
    NgxPaginationModule,
    NgFor,
    OnlyNumbersDirective,
  ],
  standalone: true,
  template: `
    <div class="lg:w-[95vw] w-[90vw] mx-auto mb-8 mt-[10rem]">
      <h1 class="text-2xl lg:text-3xl font-bold mb-4 text-white">Search</h1>
      <div class="flex flex-col lg:flex-row gap-8">
        <div
          class="bg-white bg-opacity-10 rounded-lg p-4 h-fit flex w-full lg:w-2/12 lg:sticky lg:top-12"
        >
          <form
            [formGroup]="searchForm"
            (ngSubmit)="submitSearch()"
            class="w-full flex gap-4 items-end flex-col"
          >
            <div class="flex gap-2 w-full items-start flex-col">
              <div class="flex flex-col gap-2 w-full ">
                <label class="text-white"> Movie Name </label>
                <input
                  type="text"
                  formControlName="query"
                  class="bg-slate-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Movie Name"
                  required
                />
              </div>
              <div class="flex flex-col gap-2 w-full ">
                <label for="releaseYear" class="text-white">
                  Release Year
                </label>
                <input
                  appOnlyNumbers
                  id="releaseYear"
                  type="text"
                  formControlName="releaseYear"
                  class="bg-slate-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  min="1900"
                  max="2099"
                  maxLength="4"
                  step="1"
                  placeholder="Release Year"
                />
                @if ((searchForm.get('releaseYear')?.errors?.['min'] ?? false)
                || (searchForm.get('releaseYear')?.errors?.['max'] ?? false)) {
                <div class="text-red-500 text-sm">
                  Year must be between 1900 and 2099.
                </div>
                }
              </div>
              <div class="flex flex-col gap-2 w-full ">
                <label for="region" class="text-white"> Choose a Region </label>
                <select
                  id="region"
                  formControlName="region"
                  class="bg-slate-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                >
                  <option selected disabled value="">Choose a country</option>
                  @for (item of countriesMap(); track $index) {
                  <option value="{{ item.iso_3166_1 }}">
                    {{ item.english_name }}
                  </option>
                  }
                </select>
              </div>
              <div class="flex flex-col gap-2 w-full ">
                <label for="year" class="text-white"> Year </label>
                <input
                  appOnlyNumbers
                  id="year"
                  type="text"
                  formControlName="year"
                  class="bg-slate-800 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  min="1900"
                  max="2099"
                  maxLength="4"
                  step="1"
                  placeholder="Year"
                />
                @if ((searchForm.get('year')?.errors?.['min'] ?? false) ||
                (searchForm.get('year')?.errors?.['max'] ?? false)) {
                <div class="text-red-500 text-sm">
                  Year must be between 1900 and 2099.
                </div>
                }
              </div>
              <div class="flex items-end pb-2 w-full ">
                <input
                  id="adult"
                  type="checkbox"
                  value=""
                  formControlName="adult"
                  class="w-4 h-4 text-blue-600 bg-slate-800 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label for="adult" class="ms-2 text-sm font-medium text-white "
                  >Adult</label
                >
              </div>
            </div>
            <button
              type="submit"
              [disabled]="!searchForm.valid"
              class="text-white bg-blue-700 disabled:cursor-not-allowed w-full disabled:opacity-50 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            >
              Search
            </button>
          </form>
        </div>
        <div class="flex flex-col mt-8 w-full lg:w-10/12">
          @if (searchResult()?.length === 0) {
          <p class="text-white text-base text-center">No Movie Found</p>
          } @defer (when searchResult()) {
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            <ng-container
              *ngFor="
                let movie of searchResult() || []
                  | paginate
                    : {
                        itemsPerPage: 20,
                        currentPage: p(),
                        totalItems: totalPages()
                      }
              "
            >
              <app-movie-card [movie]="movie"></app-movie-card>
            </ng-container>
          </div>
          @if((searchResult()?.length ?? 0) > 0) {
          <div class="flex justify-center mt-8">
            <pagination-controls
              (pageChange)="onPageChange($event)"
              [responsive]="true"
              previousLabel="Previous"
              nextLabel="Next"
              screenReaderPaginationLabel="Pagination"
              screenReaderPageLabel="page"
            ></pagination-controls>
          </div>
          } }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SearchComponent implements OnInit {
  fb = inject(FormBuilder);
  store = inject(Store);
  tmdbService = inject(TMDBService);
  spinner = inject(NgxSpinnerService);
  searchForm!: FormGroup;
  countriesMap = toSignal(this.store.select(selectCountriesMap), {
    initialValue: [],
  });
  searchResult = signal<Movie[] | undefined>(undefined);
  p = signal(1);
  totalPages = signal<number | undefined>(undefined);
  submit = signal<boolean>(false);

  ngOnInit() {
    this.store.dispatch(CountriesActions.loadCountries());
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required]],
      releaseYear: [
        '',
        [Validators.min(1900), Validators.max(2099), Validators.maxLength(4)],
      ],
      region: [''],
      year: [
        '',
        [Validators.min(1900), Validators.max(2099), Validators.maxLength(4)],
      ],
      adult: [false],
    });
  }

  submitSearch() {
    if (this.searchForm.invalid) {
      return;
    }

    this.spinner.show();
    const value = this.searchForm.value;
    this.tmdbService
      .searchMovies({
        query: value.query,
        region: value.region,
        releaseYear: value.releaseYear,
        year: value.year,
        adult: value.adult,
        page: this.p(),
      })
      .pipe(
        tap((res) => {
          this.searchResult.set(res.results);
          this.p.set(res.page);
          this.totalPages.set(res.total_pages);
        }),
        finalize(() => {
          timer(1000).subscribe(() => this.spinner.hide());
        })
      )
      .subscribe({
        error: (err) => console.error(err),
      });
  }

  onPageChange(page: number): void {
    this.p.set(page);
    this.submitSearch();
  }
}
