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

const show = (req, res) => {
    db.Household.findById(req.params.id)
    //REVIEW might not need to populate
    .populate('users')
    .exec((err, foundHousehold) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });
        res.status(200).json({
            status: 200,
            data: foundHousehold
        });
    });
};

module.exports = {
    showAll,
    show
}