import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux';

export const startCountdownEpic = (action$: Observable<Action>) => {
  return action$.pipe(
    ofType('TESTING'),
    switchMap(() => {
      const start = 5;

      return of({ type: 'FUCKING' });
    }),
    map(x => x)
  );
};
