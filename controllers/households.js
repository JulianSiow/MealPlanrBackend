const db = require('../models');
const { User, Household } = require('../models');

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
    .populate('members')
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
            if (err || !updatedUser) return res.status(500).json({
                status: 500,
                message: 'Could not add new household to user'
            });
        });
        res.json({
            status: 201,
            data: createdHousehold
        });
    });
};

const newMember = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });
    const userId = req.session.currentUser.id;
    const householdId = req.params.id;
    db.Household.findByIdAndUpdate(req.params.id, {$push: {members: userId}}, (err, updatedHousehold) => {
        if (err || !updatedHousehold) return res.status(500).json({
            status: 500,
            message: 'Could not add member to household'
        });
    });
    db.User.findByIdAndUpdate(userId, {$push: {households: householdId}}, (err, updatedUser) => {
        if (err || !updatedUser) return res.status(500).json({
            status: 500,
            message: 'Could not add household to user'
        });
    });
    res.json({
        status: 200,
        message: 'User and household linked'
    });
};

//FIXME should check if user logged in belongs to household!!!

const newPlan = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });

    db.Household.findByIdAndUpdate(req.params.id, {$push: {mealPlans: req.body}}, (err, updatedHousehold) => {
        if (err || !updatedHousehold) return res.status(500).json({
            status: 500,
            message: 'Could not add meal plan'
        });
    });
    res.json({
        status: 200,
        message: req.body
    });
};

const deletePlan = (req, res) => {
    if (!req.session.currentUser) return res.status(401).json({
        status: 401,
        message: 'Please log in and try again'
    });

    db.Household.findByIdAndUpdate(req.params.householdId, {$pull: {mealPlans: {_id: req.params.planId}}}, (err, householdToUpdate) => {
        if (err || !householdToUpdate) return res.status(500).json({
            status: 500,
            message: 'Could not delete meal plan'
        });
        res.status(200).json({
            status: 200,
            message: 'Meal plan deleted'
        });
    });
};

const yeet = (req, res) => {
    db.Household.deleteMany({}, (err, deletedHouseholds) => {
        if (err) return console.log(err);
        res.json({
            status: 200,
            message: 'YEET'
        });
    });
};

module.exports = {
    showAll,
    show,
    newHousehold,
    newMember,
    newPlan,
    deletePlan,
    yeet
}