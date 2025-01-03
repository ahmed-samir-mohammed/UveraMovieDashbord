import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { Movie, MovieDetails, MovieResponse } from '../models/trend.interface';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${env.TMDB_URL}/trending/all/day?language=en-US`
    );
  }

  // searchMovies(query: string): Observable<any> {
  //   return this.http.get(
  //     `${env.TMDB_URL}/search/movie?api_key=${this.apiKey}&query=${query}`
  //   );
  // }

  getMovieDetails(
    movieId: number,
    externalSource: string
  ): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${env.TMDB_URL}/find/${movieId}?external_source=${externalSource}`
    );
  }

  getExternalIDs(
    movieId: number,
  ): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `${env.TMDB_URL}/movie/${movieId}/external_ids`
    );
  }
}
