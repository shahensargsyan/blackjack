const express = require('express')
const app = express()
const port = 3000

global.players = [];
global.cards = [];
global.winner = [];

app.use('/api/game', require('./routes/game.routes'));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})