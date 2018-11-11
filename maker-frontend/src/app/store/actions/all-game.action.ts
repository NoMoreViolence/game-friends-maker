import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestAllGameSuccessModel } from 'src/app/store/models';

const GET_ALL_GAME = 'GET_ALL_GAME';
const GET_ALL_GAME_SUCCESS = 'GET_ALL_GAME_SUCCESS';
const GET_ALL_GAME_FAILURE = 'GET_ALL_GAME_FAILURE';

export class GetAllGame implements Action {
  readonly type = GET_ALL_GAME;

  constructor(public payload: string) {}
}
export class GetAllGameSuccess implements Action {
  readonly type = GET_ALL_GAME_SUCCESS;

  constructor(public payload: RequestAllGameSuccessModel) {}
}
export class GetAllGameFailure implements Action {
  readonly type = GET_ALL_GAME_FAILURE;

  constructor(public payload: HttpErrorResponse) {}
}

export { GET_ALL_GAME, GET_ALL_GAME_SUCCESS, GET_ALL_GAME_FAILURE };

export type Actions = GetAllGame | GetAllGameSuccess | GetAllGameFailure;
