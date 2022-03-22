const { alertMiddleware, checkAuth } = require('../middlewares')
const express = require('express');
const router = express.Router();

const characterController = require('../controllers/character.controller')

router.post('/', checkAuth, characterController.PostChracter);
router.get('/:id', characterController.GetCharacterById);

module.exports = router 