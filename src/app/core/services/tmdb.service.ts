import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { TrendResponse } from '../models/trend.interface';
import { GenresResponse } from '../models/genres.interface';
import { MovieDetails } from '../models/movieDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  constructor(private http: HttpClient) {}

  getTrendingMovies(page: number): Observable<TrendResponse> {
    return this.http.get<TrendResponse>(
      `${env.TMDB_URL}/trending/movie/day?page=${page}?language=en-US`
    );
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${env.TMDB_URL}/search/movie?&query=${query}`);
  }

  getMovieDetails(movieId: number | string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${env.TMDB_URL}/movie/${movieId}?append_to_response=videos,images&language=en-US`
    );
  }

  getExternalIDs(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${env.TMDB_URL}/movie/${movieId}/external_ids`
    );
  }

  getGenres(): Observable<GenresResponse> {
    return this.http.get<GenresResponse>(`${env.TMDB_URL}/genre/movie/list`);
  }
}
