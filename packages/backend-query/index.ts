require('dotenv').config();
import { Game, Genre, Clean, dbConnect } from './src';

const game = new Game();
const genre = new Genre();
const cleanDb = new Clean();

// process argv [0] [1] === nvm and node info
dbConnect().then(({ success }) => {
  if (success) {
    if (process.argv[2] === 'clean_withoutuser') {
      cleanDb.deleteTeamAndTeamUserJoin();
      return;
    }

    if (process.argv[2] === 'game') {
      if (process.argv[3] === 'create') {
        game.create();
        return;
      }
      if (process.argv[3] === 'update') {
        game.update();
        return;
      }
      if (process.argv[3] === 'delete') {
        game.delete();
        return;
      }
    } else if (process.argv[2] === 'genre') {
      if (process.argv[3] === 'create') {
        genre.create();
        return;
      }
      if (process.argv[3] === 'update') {
        genre.update();
        return;
      }
      if (process.argv[3] === 'delete') {
        genre.delete();
        return;
      }
    }
  } else {
    console.log('failure');
  }
});
