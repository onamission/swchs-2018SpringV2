// game_setup.js - Game Setup route module.

var express = require('express');
var router = express.Router();

var gameboardController = require('../controllers/gameboardController');

router.get('/setupGameboard/:game/players/:playerCount', gameboardController.setupGameBoard );

module.exports = router;
