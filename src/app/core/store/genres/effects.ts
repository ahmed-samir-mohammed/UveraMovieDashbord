import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as GenresActions from './actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TMDBService } from '../../services/tmdb.service';

@Injectable()
export class GenresEffects {
  private actions$ = inject(Actions);
  private tmdbService = inject(TMDBService);
  loadGenres$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GenresActions.loadGenres),
      mergeMap(() =>
        this.tmdbService.getGenres().pipe(
          map((genres) => {
            const genresMap = genres.genres.reduce((acc: any, genre: any) => {
              acc[genre.id] = genre.name;
              return acc;
            }, {});
            return GenresActions.loadGenresSuccess({ genres: genresMap });
          }),
          catchError((error) =>
            of(GenresActions.loadGenresFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
