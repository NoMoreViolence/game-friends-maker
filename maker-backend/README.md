# Server config

## This is default setting

### 1. Create config.json to `./config`

```json
{
  "development": {
    "username": "root",
    "password": "",
    "database": "game_maker_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": "",
    "database": "game_maker_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": "",
    "database": "game_maker_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```

### 2. Create .prettierrc to `./`

```json
{
  "singleQuote": true,
  "semi": true,
  "printWidth": 130
}
```

### 3. Create .env to `./`

```env
 NODE_ENV=production
```
