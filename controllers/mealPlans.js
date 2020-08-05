const db = require('../models');

//GET all households
//REVIEW
const showAll = (req, res) => {
    db.MealPlan.find({}, (err, allPlans) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: allPlans
        });
    });
};

module.exports = {
    showAll
}