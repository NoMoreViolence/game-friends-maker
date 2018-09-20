import { Sequelize } from 'sequelize-typescript';
import * as config from 'config/database.config.json';
import User from './user.model';
import Game from './game.model';
import AllGame from './allgame.model';
import GenreGame from './genregame.model';
import AllGenreGame from './allgenregame.model';
const wayToSequelize = process.env.NODE_ENV || 'development';
const Config = config[wayToSequelize];

const sequelize = new Sequelize({
  username: Config.username,
  password: Config.password,
  database: Config.database,
  host: Config.host,
  dialect: Config.dialect,
  operatorsAliases: false,
  modelPaths: [__dirname + '/**/*.model.ts'],
  pool: {
    max: 20,
    min: 0,
    idle: 10000
  }
});

export { User, Game, AllGame, GenreGame, AllGenreGame };
export default sequelize;

// const { Op } = Sequelize;
// const operatorsAliases = {
//   $eq: Op.eq,
//   $ne: Op.ne,
//   $gte: Op.gte,
//   $gt: Op.gt,
//   $lte: Op.lte,
//   $lt: Op.lt,
//   $not: Op.not,
//   $in: Op.in,
//   $notIn: Op.notIn,
//   $is: Op.is,
//   $like: Op.like,
//   $notLike: Op.notLike,
//   $iLike: Op.iLike,
//   $notILike: Op.notILike,
//   $regexp: Op.regexp,
//   $notRegexp: Op.notRegexp,
//   $iRegexp: Op.iRegexp,
//   $notIRegexp: Op.notIRegexp,
//   $between: Op.between,
//   $notBetween: Op.notBetween,
//   $overlap: Op.overlap,
//   $contains: Op.contains,
//   $contained: Op.contained,
//   $adjacent: Op.adjacent,
//   $strictLeft: Op.strictLeft,
//   $strictRight: Op.strictRight,
//   $noExtendRight: Op.noExtendRight,
//   $noExtendLeft: Op.noExtendLeft,
//   $and: Op.and,
//   $or: Op.or,
//   $any: Op.any,
//   $all: Op.all,
//   $values: Op.values,
//   $col: Op.col
// };
