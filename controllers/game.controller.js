const GameService = require("../services/GameService");

const url = "https://pickatale-backend-case.herokuapp.com/shuffle";

players = [];
cards = [];
winner = [];
game = {
  'winner': '',
  'players': []
};

module.exports = class Game {

    static async start(req, res, next) {
       try {
            await GameService.getCards(url);
            GameService.resetGame();
            GameService.addPlayer('Annie');
            GameService.addPlayer('Bob');
            GameService.play();
            GameService.getWinner()

            res.status(200).json(game);  
       } catch (error) {
            res.status(500).json({error: error})
       }
   }
}
