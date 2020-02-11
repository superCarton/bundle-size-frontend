import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ACTION_GET_BUNDLE_SIZE_FROM_API,
  GetBundleSizeFromApiAction,
  GetBundleSizeAction,
  GetBundleSizeFailAction
} from './bundle-size.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';
import { RequestFailedError } from 'src/helpers';

@Injectable()
export class BundleSizeEffect {
  constructor(private actions$: Actions) {}

  @Effect()
  public bundleSizeEffect$: Observable<GetBundleSizeAction | GetBundleSizeFailAction> = this.actions$.pipe(
    ofType<GetBundleSizeFromApiAction>(ACTION_GET_BUNDLE_SIZE_FROM_API),
    switchMap((action) =>
      from(action.call).pipe(
        map((response) => {
          if (response.errors && response.errors.length > 0) {
            return new GetBundleSizeFailAction(response.errors);
          }
          return new GetBundleSizeAction(response.data, response.warnings);
        }),
        catchError((err: RequestFailedError) => {
          return of(new GetBundleSizeFailAction(err.messages));
        })
      )
    )
  );
}
