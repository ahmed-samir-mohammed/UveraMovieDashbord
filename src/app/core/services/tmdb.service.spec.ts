import { TestBed } from '@angular/core/testing';

import { TMDBService } from './tmdb.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment as env } from '../../../environments/environment.development';
import { TrendResponse } from '../models/trend.interface';
import { GenresResponse } from '../models/genres.interface';
import { MovieDetails } from '../models/movieDetails.interface';
import { Countries } from '../models/countries.interface';

describe('TMDBService', () => {
  let service: TMDBService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TMDBService],
    });
    service = TestBed.inject(TMDBService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch trending movies', () => {
    const dummyResponse: TrendResponse = {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 1,
      loading: false,
      error: null,
    };
    service.getTrendingMovies(1).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(
      `${env.TMDB_URL}/trending/movie/day?page=1?language=en-US`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should search movies', () => {
    const dummyResponse: TrendResponse = {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 1,
      loading: false,
      error: null,
    };
    const searchParams = {
      query: 'test',
      adult: false,
      releaseYear: '2021',
      page: 1,
      region: 'US',
      year: '2021',
    };
    service.searchMovies(searchParams).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(
      `${env.TMDB_URL}/search/movie?query=test&include_adult=false&language=en-US&primary_release_year=2021&page=1&region=US4&year=2021'`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch movie details', () => {
    const dummyResponse: MovieDetails = {
      id: 1,
      title: 'Test Movie',
      overview: 'Test Overview',
      adult: false,
      backdrop_path: '',
      belongs_to_collection: {
        backdrop_path: '',
        id: 0,
        name: '',
        poster_path: '',
      },
      budget: 0,
      genres: [],
      homepage: '',
      imdb_id: '',
      original_language: '',
      original_title: '',
      popularity: 0,
      poster_path: '',
      production_companies: [],
      production_countries: [],
      release_date: '',
      revenue: 0,
      runtime: 0,
      spoken_languages: [],
      status: '',
      tagline: '',
      video: false,
      vote_average: 0,
      vote_count: 0,
      videos: { results: [] },
    };
    service.getMovieDetails(1).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(
      `${env.TMDB_URL}/movie/1?append_to_response=videos,images&language=en-US`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch genres', () => {
    const dummyResponse: GenresResponse = { genres: [] };
    service.getGenres().subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${env.TMDB_URL}/genre/movie/list`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch countries', () => {
    const dummyResponse: Countries[] = [];
    service.getCountries().subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${env.TMDB_URL}/configuration/countries`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });
});
