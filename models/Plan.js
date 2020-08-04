const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const PlanSchema = mongoose.Schema({
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

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = Plan;