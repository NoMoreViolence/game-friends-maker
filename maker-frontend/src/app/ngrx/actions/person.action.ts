import { Action } from '@ngrx/store';
import { Person } from './../models/person.model';

const PERSON_ADD = 'PERSON_ADD';
const PERSON_DELETE = 'PERSON_DELETE';

export class AddPerson implements Action {
  readonly type = PERSON_ADD;

  constructor(public payload: Person) {}
}

export class DeletePerson implements Action {
  readonly type = PERSON_DELETE;

  constructor(public payload: number) {}
}

export { PERSON_ADD, PERSON_DELETE };
export type Actions = AddPerson | DeletePerson;
