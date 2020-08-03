const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//PATH = /api/v1/households

//GET all households
//FIXME development only
router.get('/all', ctrl.households.showAll);

//GET find by id
router.get('/:id', ctrl.households.show);

module.exports = router;