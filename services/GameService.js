const request = require("request");

url = "https://pickatale-backend-case.herokuapp.com/shuffle";

module.exports = class GameService {
    constructor() {
        this.players = [];
        this.cards = [];
        this.winner = [];
        this.game = {
            'winner': '',
            'players': []
        };
    }

    async getCards() {
        return new Promise(function (resolve, reject) {
            request(url, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    this.cards = JSON.parse(body);
                    resolve(this.cards);
                } else {
                    reject(error);
                }
            });
        });
    }

    addPlayer(name) {
        let player = {
            'name' : name,
            'points' : 0,
            'cards' : [],
        }
        this.players.push(player);
        this.game.players.push(player)
    }

    resetGame(name) {
        this.players = [];
        this.game['players'] = [];
        this.game['winner'] = '';
    }

    play() {
        this.players.forEach((player, index) => {
            this.pullTheCard(index, 2)
        });
        let winnerPlayer;
        if(winnerPlayer = this.checkBlackjackWinner()) {
            this.game['winner'] = winnerPlayer['name'];
            return;
        }
        
        //if there is no winner continue drowing
        this.players.forEach((player, index) => {
            do {
                this.pullTheCard(index);
                if (this.players[index].points > 21) {
                    this.players.splice(index, 1);
                    break;
                }
            }
            while (this.players[index].points <= 17);

            if (this.players.length == 1) {
                return;
            }
        });  
    }

    pullTheCard(index, count = 1) {
        for(let i=0; i<count; i++) {
            let card = this.cards.shift();
            this.players[index].points+=this.getCardPoints(card.value);
            this.players[index].cards.push(this.getCardName(card));
        }
    }

    getCardPoints(value) {
        if (value = parseInt(value)) {
            return value;
        } else {
            if (value == 'A') {
                return 11;
            } else {
                return 10;
            }
        }
    }

    getCardName(card) {
        return card.suit[0].toUpperCase() + card.value;
    }

    checkBlackjackWinner() {
        this.winner = Object.keys(this.players).find(key => this.players.points === 21);
    }

    getWinner() {
        if (this.game['winner'])
            return

        let winPlayer
        if (this.players.length == 1) {
            winPlayer = this.players.shift();
            this.game.winner = winPlayer.name;
            return;
        }
        let winPlayerkey = Object.keys(this.players).
            reduce((a, b) => this.players[a].points > this.players[b].points ? a : b);
            this.game.winner = this.players[winPlayerkey].name;
    }
}