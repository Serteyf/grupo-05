module.exports = {
  "development": {
    "username": "root",
    "password": null, //Coordinar nombre con el equipo. Tiene que ir entre comillas.//
    "database": "level_up", //Esto se cambió, pero me tira un mensaje raro cuando hago "git add ." El mensaje es "warning: LF will be replaced by CRLF in database/config/config.js. The file will have its original line endings in your working directory". //
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
