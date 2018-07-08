const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = {
    username: String,
    password: String
}
module.exports = Mongoose.model('User', new Schema(UserSchema));