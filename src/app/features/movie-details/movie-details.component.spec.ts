import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { TMDBService } from './../../core/services/tmdb.service';
import { MovieDetails } from '../../core/models/movieDetails.interface';
import * as GenreActions from '../../store/genres/actions';
import { Genres } from '../../core/models/genres.interface';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let tmdbService: jasmine.SpyObj<TMDBService>;
  let store: jasmine.SpyObj<Store>;
  let spinner: jasmine.SpyObj<NgxSpinnerService>;
  let activatedRoute: ActivatedRoute;
  const movieDetails: MovieDetails = {
    vote_count: 1000,
    id: 1,
    title: 'Test Movie',
    backdrop_path: '/test.jpg',
    vote_average: 8.5,
    original_title: 'Test Movie Original',
    adult: false,
    overview: 'Test overview',
    release_date: '2023-01-01',
    spoken_languages: [
      { name: 'English', english_name: 'English', iso_639_1: 'en' },
    ],
    genres: [{ id: 1, name: 'Action' }],
    popularity: 100,
    budget: 1000000,
    revenue: 2000000,
    belongs_to_collection: {
      name: 'Test Collection',
      backdrop_path: '/test_backdrop.jpg',
      id: 1,
      poster_path: '/test_poster.jpg',
    },
    videos: {
      results: [
        {
          key: 'testkey',
          name: 'Test Video',
          id: '1',
          iso_639_1: 'en',
          iso_3166_1: 'US',
          official: true,
          published_at: '2023-01-01T00:00:00Z',
          site: 'YouTube',
          size: 1080,
          type: 'Trailer',
        },
      ],
    },
    poster_path: '/testposter.jpg',
    homepage: 'http://testhomepage.com',
    imdb_id: 'tt1234567',
    original_language: 'en',
    production_companies: [
      {
        id: 1,
        name: 'Test Production',
        logo_path: '/test_logo.jpg',
        origin_country: 'US',
      },
    ],
    production_countries: [
      { iso_3166_1: 'US', name: 'United States of America' },
    ],
    runtime: 120,
    status: 'Released',
    tagline: 'Test tagline',
    video: false,
  };

  beforeEach(async () => {
    const tmdbServiceSpy = jasmine.createSpyObj('TMDBService', [
      'getMovieDetails',
    ]);
    tmdbServiceSpy.getMovieDetails.and.returnValue(of(movieDetails));
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    const spinnerSpy = jasmine.createSpyObj('NgxSpinnerService', [
      'show',
      'hide',
    ]);

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        { provide: TMDBService, useValue: tmdbServiceSpy },
        { provide: Store, useValue: storeSpy },
        { provide: NgxSpinnerService, useValue: spinnerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    tmdbService = TestBed.inject(TMDBService) as jasmine.SpyObj<TMDBService>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    spinner = TestBed.inject(
      NgxSpinnerService
    ) as jasmine.SpyObj<NgxSpinnerService>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadGenres on init', () => {
    component.ngOnInit();
    ``;
    expect(store.dispatch).toHaveBeenCalledWith(GenreActions.loadGenres());
  });

  it('should handle error when fetching movie details', () => {
    const errorResponse = new Error('Error fetching movie details');
    tmdbService.getMovieDetails.and.returnValue(throwError(errorResponse));
    component.ngOnInit();
  });

  it('should define movie$ as an Observable', () => {
    expect(component.movie$).toBeDefined();
  });

  it('should update movie$ with fetched movie details', () => {
    tmdbService.getMovieDetails.and.returnValue(of(movieDetails));
    component.ngOnInit();
    component.movie$.subscribe((movie) => {
      expect(movie).toEqual(movieDetails);
    });
  });
});
