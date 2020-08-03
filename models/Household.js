const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseholdSchema = mongoose.Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    recipes: [String]
})

const Household = mongoose.model('Household', HouseholdSchema);

module.exports = Household;