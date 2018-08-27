import { Sequelize } from 'sequelize-typescript';
import * as config from 'config/config.json';
const wayToSequelize = process.env.NODE_ENV || 'development';
const Config = config[wayToSequelize];

const sequelize = new Sequelize({
  username: Config.username,
  password: Config.password,
  database: Config.database,
  host: Config.host,
  dialect: Config.dialect,
  operatorsAliases: Config.operatorsAliases,
  modelPaths: [__dirname + '*.model.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  }
});

console.log(sequelize.models);

export default sequelize;
