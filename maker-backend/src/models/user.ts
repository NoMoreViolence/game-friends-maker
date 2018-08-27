import { DataTypes } from 'sequelize';

export default (sequelize, DataType: DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      _ID: {
        field: '_id',
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        field: 'username',
        type: DataType.STRING(100),
        unique: true,
        allowNull: false
      },
      email: {
        field: 'email',
        type: DataType.STRING(100),
        unique: true,
        allowNull: false
      },
      password: {
        field: 'password',
        type: DataType.STRING(100),
        allowNull: false
      },
      salt: {
        field: 'salt',
        type: DataType.INTEGER,
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        type: DataType.DATE,
        allowNull: false
      },
      updatedAt: {
        field: 'updated_at',
        type: DataType.DATE,
        allowNull: false
      }
    },
    {
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: 'user'
    }
  );

  return User;
};
