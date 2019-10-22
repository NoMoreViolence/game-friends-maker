require('dotenv').config();
import { Game, Genre, dbConnect } from './src';

const game = new Game();
const genre = new Genre();

dbConnect().then(({ success }) => {
  if (success) {
    console.log('DBconnect success');
    // DO things here
  } else {
    console.log('DBconnect failure');
  }
});
