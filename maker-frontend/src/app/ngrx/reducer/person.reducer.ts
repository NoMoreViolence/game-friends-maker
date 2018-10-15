import { PersonModel } from './../models';
import { PersonActions } from './../actions';

const initialState: PersonModel = {
  name: 'Lee ji Hoon',
  age: 19
};

export const personReducer = (state: PersonModel[] = [initialState], action: PersonActions.Actions) => {
  switch (action.type) {
    case PersonActions.PERSON_ADD:
      return [...state, action.payload];
    default:
      return state;
  }
};
