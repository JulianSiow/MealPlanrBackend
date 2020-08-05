const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseholdSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    recipes: [String],
    mealPlans: [{
        date: {
            type: Date,
            required: true
        },
        breakfast: {
            name: String,
            recipeId: String
        },
        lunch: {
            name: String,
            recipeId: String
        },
        dinner: {
            name: String,
            recipeId: String
        }
    }]
});

const Household = mongoose.model('Household', HouseholdSchema);

module.exports = Household;