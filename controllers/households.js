const db = require('../models');

//GET all households
//FIXME development only

const showAll = (req, res) => {
    db.Household.find({}, (err, allHouseholds) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: allHouseholds
        });
    });
};



module.exports = {
    showAll,
}