const {Router} = require('express')
const router = Router()
const GameCtrl = require("../controllers/game.controller");

router.get('/', GameCtrl.start)

module.exports = router