import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { TMDBService } from './../../core/services/tmdb.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let tmdbService: jasmine.SpyObj<TMDBService>;
  let spinner: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    const tmdbServiceSpy = jasmine.createSpyObj('TMDBService', [
      'searchMovies',
    ]);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', [
      'show',
      'hide',
    ]);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SearchComponent],
      providers: [
        provideMockStore({
          initialState: {
            countries: {
              list: [],
              loading: false,
              error: null,
            },
          },
        }),
        { provide: TMDBService, useValue: tmdbServiceSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    tmdbService = TestBed.inject(TMDBService) as jasmine.SpyObj<TMDBService>;
    spinner = TestBed.inject(
      NgxSpinnerService
    ) as jasmine.SpyObj<NgxSpinnerService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
