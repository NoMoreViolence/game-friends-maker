import { Action } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { SignActions, SignActionTypes } from '../actions';

export const loginEpic = (actions$: ActionsObservable<Action>) =>
  actions$.pipe(
    ofType<SignActions>(SignActionTypes.LOGIN),
    switchMap(() => {
      const start = 5;
      console.log('fuck You');

      return of({ type: 'FUCKING' });
    }),
    map(x => x)
  );
