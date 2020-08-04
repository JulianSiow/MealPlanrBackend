const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const MealPlanSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    name: String,
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
});

const MealPlan = mongoose.model('MealPlan', MealPlanSchema);

module.exports = MealPlan;