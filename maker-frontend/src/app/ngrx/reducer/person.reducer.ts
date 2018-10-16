import { PersonModel } from './../models';
import { PersonActions } from './../actions';
import { produce } from 'immer';

const initialState: PersonModel = {
  name: 'Lee ji Hoon',
  age: 19
};

export const personReducer = produce<PersonModel[], PersonActions.Actions>(
  (draft, action) => {
    switch (action.type) {
      case PersonActions.PERSON_ADD:
        draft.push(action.payload);
        return;
      case PersonActions.PERSON_DELETE:
        draft.splice(action.payload, 1);
        return;
      default:
        return draft;
    }
  },
  [initialState]
);
