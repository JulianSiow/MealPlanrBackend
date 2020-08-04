const db = require('../models');
const { User } = require('../models');

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

const newHousehold = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });

    const householdData = {...req.body}
    householdData.members = [req.session.currentUser.id];

    db.Household.create(householdData, (err, createdHousehold) => {
        if (err) return console.log(err);
        
        db.User.findByIdAndUpdate(req.session.currentUser.id, {$push: {households: createdHousehold._id}}, (err, updatedUser) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Could not add new household to user'
            });
            updatedUser.households.push(createdHousehold._id);
            User.save;
        });
        res.json({
            status: 201,
            data: createdHousehold
        });
    });
};

module.exports = {
    showAll,
    show,
    newHousehold
}