import { createEntityAdapter } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { produce } from 'immer';
import { Game, GameUnit } from '../models';
import { allGameActions, SignActions } from '../actions';

const allGameAdapter = createEntityAdapter<GameUnit>({
  selectId: null,
  sortComparer: null
});
const defaultState: Game = {
  currentGame: null,
  currentGameId: null,
  entities: {
    awef: {
      id: 23,
      gamename: 'FIFA',
      genres: ['FPS'],
      window: false,
      mac: false,
      xbox: false,
      ps: false,
      nswitch: false,
      ios: false,
      android: false
    }
  },
  ids: ['awef']
};

const initialState: Game = allGameAdapter.getInitialState(defaultState);
const allGameReducer = produce<Game, allGameActions.Actions>((draft, action) => {
  switch (action.type) {
    case allGameActions.GET_ALL_GAME:
      return draft;
    case allGameActions.GET_ALL_GAME_SUCCESS:
      return draft;
    case allGameActions.GET_ALL_GAME_FAILURE:
      return draft;
    default:
      return draft;
  }
}, initialState);

const getAllGameState = createFeatureSelector<Game>('allGame');
const getCurrentGame = createSelector(
  getAllGameState,
  game => game.currentGame
);
const getCurrentGameId = createSelector(
  getAllGameState,
  game => game.currentGameId
);
const getAllGames = createSelector(
  getAllGameState,
  game => game.entities
);
const getAllGameIds = createSelector(
  getAllGameState,
  game => game.ids
);

export { allGameReducer, getCurrentGame, getCurrentGameId, getAllGames, getAllGameIds };
