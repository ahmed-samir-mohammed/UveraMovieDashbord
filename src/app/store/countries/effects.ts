import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as CountriesActions from './actions';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TMDBService } from '../../core/services/tmdb.service';
/**
 * @class CountriesEffects
 * @description This class contains the side effects for countries in the application.
 * It listens for actions dispatched to the store and performs asynchronous operations
 * such as fetching data from the TMDB service.
 */
@Injectable()
export class CountriesEffects {
  private actions$ = inject(Actions);
  private tmdbService = inject(TMDBService);
  loadCountries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CountriesActions.loadCountries),
      mergeMap(() =>
        this.tmdbService.getCountries().pipe(
          map((countries) => {
            return CountriesActions.loadCountriesSuccess({ countries });
          }),
          catchError((error) =>
            of(CountriesActions.loadCountriesFailure({ error: error.message }))
          )
        )
      )
    );
  });
}
