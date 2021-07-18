const {Router} = require('express')
//const config = require('config')
const router = Router()
const request = require("request");

function getCards(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                reject(error);
            }
        });
    });
}

async function main(url) {
    let res = await getCards(url);
    return res;
}

function addPlayer(name) {
    let player = {
        'name' : name,
        'points' : 0,
        'cards' : [],
    }
    players.push(player);
    game.players.push(player)
}

function resetPlayers(name) {
    players = [];
    game.players = [];
}

function play() {
    players.forEach((player, index) => {
        pullTheCard(index, 2)
    });
    
    if(winnerPlayer = checkBlackjackWinner()) {
        game['winner'] = winnerPlayer['name'];
        return;
    }
    
    players.forEach((player, index) => {
        do {
            pullTheCard(index);
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

function pullTheCard(index, count = 1) {
    for(i=0; i<count; i++) {
        let card = cards.shift();
        console.log('players[index]',players[index],card)
        players[index].points+=getCardPoints(card.value)
        players[index].cards.push(getCardName(card))
    }
}

function getCardPoints(value) {
    if (value = parseInt(value)) {
        return parseInt(value);
    } else {
        if (value == 'A') {
            return 11;
        } else {
            return 10;
        }
    }
}

function getCardName(card) {
    return card.suit[0].toUpperCase() + card.value;
}

function checkBlackjackWinner() {
    winner  =  Object.keys(players).find(key => players.points === 21);
}

function getWinner() {
    let winPlayer
    if (players.length == 1) {
        winPlayer = players[0];
        game.winner = winPlayer.name
        return;
    }
    winPlayerkey = Object.keys(players).reduce((a, b) => players[a].points > players[b].points ? a : b);
    game.winner = players[winPlayerkey].name
}

router.get('/start', async (req, res) => {
    const url = "https://pickatale-backend-case.herokuapp.com/shuffle";
    resetPlayers();
    cards = await main(url)

    addPlayer('Annie');
    addPlayer('Bob');
    play();
    if (!game['winner'])
        getWinner()
    res.status(200).json(game);   
})

module.exports = router