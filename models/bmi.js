const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

BmiSchema = {
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    height: {
        feet: Number,
        inches: Number
    },
    weight: Number
};

module.exports = mongoose.model('Bmi', new Schema(BmiSchema));