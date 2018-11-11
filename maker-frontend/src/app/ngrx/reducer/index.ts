// import { MetaReducer } from '@ngrx/store';
// import { metaReducer } from './meta.reducer';
import * as signReducer from './sign.reducer';
import * as gameReducer from './all-game.reducer';

const reducer = {
  user: signReducer.signReducer,
  allGame: gameReducer.allGameReducer
};

export { reducer, signReducer, gameReducer };
