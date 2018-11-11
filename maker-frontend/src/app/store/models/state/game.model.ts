import { EntityState } from '@ngrx/entity';

interface GameUnit {
  id: number;
  gamename: string;
  window: boolean;
  mac: boolean;
  xbox: boolean;
  ps: boolean;
  nswitch: boolean;
  android: boolean;
  ios: boolean;
  genres: string[];
}

interface Game extends EntityState<GameUnit> {
  currentGameId: string | number | null;
  currentGame: GameUnit | null;
}

export { GameUnit, Game };
