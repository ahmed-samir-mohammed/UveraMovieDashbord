import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { TMDBService } from './../../core/services/tmdb.service';
import { MovieDetails } from '../../core/models/movieDetails.interface';
import * as GenreActions from '../../core/store/genres/actions';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let tmdbService: jasmine.SpyObj<TMDBService>;
  let store: jasmine.SpyObj<Store>;
  let spinner: jasmine.SpyObj<NgxSpinnerService>;

  beforeEach(async () => {
    const tmdbServiceSpy = jasmine.createSpyObj('TMDBService', ['getMovieDetails']);
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        { provide: TMDBService, useValue: tmdbServiceSpy },
        { provide: Store, useValue: storeSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    tmdbService = TestBed.inject(TMDBService) as jasmine.SpyObj<TMDBService>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    spinner = TestBed.inject(NgxSpinnerService) as jasmine.SpyObj<NgxSpinnerService>;

    tmdbService.getMovieDetails.and.returnValue(of({} as MovieDetails));
    store.select.and.returnValue(of({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadGenres action on init', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(GenreActions.loadGenres());
  });

  it('should show spinner when fetching movie details', () => {
    component.ngOnInit();
    expect(spinner.show).toHaveBeenCalled();
  });

  it('should hide spinner after fetching movie details', () => {
    component.ngOnInit();
    expect(spinner.hide).toHaveBeenCalled();
  });

  it('should call getMovieDetails with the correct id', () => {
    component.ngOnInit();
    expect(tmdbService.getMovieDetails).toHaveBeenCalledWith(123);
  });

  it('should get genres correctly', () => {
    const genres = [{ id: 1, name: 'Action' }];
    store.select.and.returnValue(of({ 1: 'Action' }));
    const result = component.getGenres(genres);
    expect(result).toBe('Action');
  });
});
