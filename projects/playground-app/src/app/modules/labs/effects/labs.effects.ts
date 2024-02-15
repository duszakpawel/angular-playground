import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LabsService } from 'playground-api/services';
import { loadLabs, loadLabsFailure, loadLabsSuccess } from '../actions/labs.actions';

@Injectable()
export class LabsEffects {

  loadLabs = createEffect(() =>
    this.actions.pipe(
      ofType(loadLabs),
      concatMap(() => this.labsService.getLabs().pipe(
        map(labs => loadLabsSuccess({labs})),
        catchError(() => of(loadLabsFailure()))
      ))
    )
  );

  loadLabsFailure = createEffect(() =>
    this.actions.pipe(
      ofType(loadLabsFailure),
      tap(() => alert('Nie udało się pobrać laboratoriów!'))
    ), {dispatch: false}
  );

  constructor(
    private actions: Actions,
    private labsService: LabsService
  ) {}

}
