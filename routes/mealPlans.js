const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//PATH = /api/v1/mealPlans

//GET all meal plans
router.get('/all', ctrl.mealPlans.showAll)

module.exports = router;