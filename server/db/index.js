const path = require('path');
const mongoose = require('mongoose');
const Users = require('./schemas/users');

require('dotenv').config({ path: path.join('config', '.env') });

const connectDB = () => mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.info('Successfully connected to DB');
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
    throw err;
  });

module.exports = {
  connectDB,
  Users,
};
