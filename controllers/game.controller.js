const GameService = require("../services/GameService");

module.exports = class Game {
    static async start(req, res, next) {
       try {
          const game = new GameService();
            
          game.resetGame();
          game.cards = await game.getCards();
          game.addPlayer('Annie');
          game.addPlayer('Bob');
          game.play();
          game.getWinner()

          res.status(200).json(game.game);  
       } catch (error) {
            res.status(500).json({error: error})
       }
   }
}
