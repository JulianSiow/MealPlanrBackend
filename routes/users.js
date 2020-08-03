const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//PATH = /api/v1/users

//GET all users
router.get('/all', ctrl.users.showAllUsers);


module.exports = router;