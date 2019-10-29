require('dotenv').config();
import { Game, Genre, dbConnect } from './src';

const game = new Game();
const genre = new Genre();

dbConnect().then(({ success }) => {
  if (success) {
    if (process.argv[0] === 'game') {
      if (process.argv[1] === 'create') {
        game.create();
        return;
      }
      if (process.argv[1] === 'update') {
        game.update();
        return;
      }
      if (process.argv[1] === 'delete') {
        game.delete();
        return;
      }
    } else if (process.argv[0] === 'genre') {
      if (process.argv[1] === 'create') {
        genre.create();
        return;
      }
      if (process.argv[1] === 'update') {
        genre.update();
        return;
      }
      if (process.argv[1] === 'delete') {
        genre.delete();
        return;
      }
    }
  } else {
    //
  }
});
