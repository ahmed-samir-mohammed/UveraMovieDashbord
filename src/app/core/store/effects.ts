import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as MovieActions from './actions';
import { catchError, exhaustMap, map, mergeMap, of, pipe, tap } from 'rxjs';
import { TMDBService } from '../services/tmdb.service';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private tmdbService = inject(TMDBService);

  loadTrendingMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.loadTrendingMovies),
      tap(() => MovieActions.startLoading()),
      mergeMap(() =>
        this.tmdbService.getTrendingMovies().pipe(
          map((data) =>
            MovieActions.loadTrendingMoviesSuccess({ movies: data.results })
          ),
          catchError((error) =>
            of(MovieActions.loadTrendingMoviesFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
