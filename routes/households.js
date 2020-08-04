const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//PATH = /api/v1/households

//GET all households
//FIXME development only
router.get('/all', ctrl.households.showAll);

//GET find by id
router.get('/:id', ctrl.households.show);

//POST new household
router.post('/new', ctrl.households.newHousehold);

//PUT add members
router.put('/:id', ctrl.households.newMember);

//DELETE all households
//FIXME dev only
router.delete('/yeet', ctrl.households.yeet);

module.exports = router;