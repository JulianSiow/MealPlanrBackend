const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    households: [{
        type: Schema.Types.ObjectId,
        ref: 'Household'
    }],
    // Fav Recipes list?
});

const User = mongoose.model('User', UserSchema);

module.exports = User;