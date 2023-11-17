const DATABASE_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'real-time_chat';

const ACCESS_TOKEN_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '1d';

const PORT = 3000;


module.exports = {
  DATABASE_URL,
  DATABASE_NAME,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  PORT
};
