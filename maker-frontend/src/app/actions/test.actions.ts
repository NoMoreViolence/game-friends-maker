import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Test } from 'src/models';

export const UP_COUNT = 'test/UP_COUNT';
export const DOWN_COUNT = 'test/DOWN_COUNT';

export class UPCOUNT implements Action {
  readonly type = UP_COUNT;

  constructor(public payload: void) {}
}

export class DOWNCOUNT implements Action {
  readonly type = DOWN_COUNT;

  constructor(public payload: void) {}
}

export type Actions = UPCOUNT | DOWNCOUNT;
