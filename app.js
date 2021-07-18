const express = require('express')
const app = express()
const port = 3000

global.players = [];
global.cards = [];
global.winner = [];
global.game = {
  'winner': '',
  'players': []
};

app.use('/api/game', require('./routes/game.routes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})