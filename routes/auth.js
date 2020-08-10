const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// Path: /api/v1/auth

router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);

module.exports = router;