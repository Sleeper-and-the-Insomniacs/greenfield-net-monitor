const { Schema, model } = require('mongoose');

const usersSchema = new Schema({
  name: String,
});

module.exports = model('Users', usersSchema);
