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



module.exports = {
    showAllUsers
};