const db = require('../models');

//GET all users
const showAllUsers = (req, res) => {
    db.User.find({})
    .exec((err, allUsers) => {
        if (err) {
            return console.log(err);
        };
        res.json({
            status: 200,
            count: allUsers.length,
            data: allUsers
        });
    });
};

//GET show one user
const show = (req, res) => {
    if(!req.session.currentUser) return res.status(401).json({
        status: 401, 
        message: 'Please log in and try again'
    });

    db.User.findById(req.session.currentUser.id)
    .exec((err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        });

        res.status(200).json({
            status: 200,
            data: foundUser
        });
    });
};

module.exports = {
    showAllUsers,
    show
};