const request = require("request");

module.exports = class ArticleService {
    static async getAllArticles() {
        try {
            const allArticles = await  Article.find();
            return allArticles;
        } catch (error) {
            console.log(`Could not fetch articles ${error}`)
        }
    }

    static async getCards(url) {
        return new Promise(function (resolve, reject) {
            request(url, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    cards = JSON.parse(body);
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
    }

    static addPlayer(name) {
        let player = {
            'name' : name,
            'points' : 0,
            'cards' : [],
        }
        players.push(player);
        game.players.push(player)
    }

    static resetGame(name) {
        players = [];
        game.players = [];
        game['winner'] = '';
    }

    static play() {
        players.forEach((player, index) => {
            this.pullTheCard(index, 2)
        });
        let winnerPlayer;
        if(winnerPlayer = this.checkBlackjackWinner()) {
            game['winner'] = winnerPlayer['name'];
            return;
        }
        
        //if there is no winner continue drowing
        players.forEach((player, index) => {
            do {
                this.pullTheCard(index);
                if (players[index].points > 21) {
                    players.splice(index, 1);
                    break;
                }
            }
            while (players[index].points <= 17);

            if (players.length == 1) {
                return;
            }
        });  
    }

    static pullTheCard(index, count = 1) {
        for(let i=0; i<count; i++) {
            let card = cards.shift();
            players[index].points+=this.getCardPoints(card.value);
            players[index].cards.push(this.getCardName(card));
        }
    }

    static getCardPoints(value) {
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

    static getCardName(card) {
        return card.suit[0].toUpperCase() + card.value;
    }

    static checkBlackjackWinner() {
        winner = Object.keys(players).find(key => players.points === 21);
    }

    static getWinner() {
        if (game['winner'])
            return

        let winPlayer
        if (players.length == 1) {
            winPlayer = players.shift();
            game.winner = winPlayer.name;
            return;
        }
        let winPlayerkey = Object.keys(players).
            reduce((a, b) => players[a].points > players[b].points ? a : b);
        game.winner = players[winPlayerkey].name;
    }
}