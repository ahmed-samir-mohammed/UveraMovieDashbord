import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as MovieActions from './actions';
import { catchError, exhaustMap, map, mergeMap, of, pipe, tap } from 'rxjs';
import { TMDBService } from '../../core/services/tmdb.service';
/**
 * @class TrendEffects
 * @description This class contains the side effects for trending movies in the application.
 * It listens for actions dispatched to the store and performs asynchronous operations
 * such as fetching data from the TMDB service.
 */
@Injectable()
export class TrendEffects {
  private actions$ = inject(Actions);
  private tmdbService = inject(TMDBService);

  loadTrendingMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MovieActions.loadTrendingMovies),
      mergeMap(({ page }) =>
        this.tmdbService.getTrendingMovies(page).pipe(
          map((data) =>
            MovieActions.loadTrendingMoviesSuccess({
              results: data.results,
              total_pages: data.total_pages,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadTrendingMoviesFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
