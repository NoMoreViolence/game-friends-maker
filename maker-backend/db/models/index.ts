import { Sequelize } from 'sequelize-typescript';
import User from './user.model';
import Email from './email.model';
import * as config from 'config/database.config.json';
const wayToSequelize = process.env.NODE_ENV || 'development';
const Config = config[wayToSequelize];

const sequelize = new Sequelize({
  username: Config.username,
  password: Config.password,
  database: Config.database,
  host: Config.host,
  dialect: Config.dialect,
  operatorsAliases: Config.operatorsAliases,
  modelPaths: [__dirname + '/**/*.model.ts']
});

export { User, Email };
export default sequelize;
