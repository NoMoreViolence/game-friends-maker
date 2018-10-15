import { PersonModel } from './ngrx/models/';

export interface AppState {
  readonly persons: PersonModel[];
}
