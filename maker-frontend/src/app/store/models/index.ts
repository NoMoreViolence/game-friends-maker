import { SignInSuccessModel, SignUpSuccessModel, RequestAllGameSuccessModel } from './action';
import { User, Game, GameUnit } from './state';

interface AppState {
  user: User;
  myGame: Game;
  allGame: Game;
}

export { SignInSuccessModel, SignUpSuccessModel, RequestAllGameSuccessModel, AppState, User, Game, GameUnit };
