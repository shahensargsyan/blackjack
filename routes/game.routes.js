const {Router} = require('express')
//const config = require('config')
const router = Router()
//const https = require('https');
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
    console.log('res',res);
    return res;
}

function addPlayer(name) {
    players.push({
        'name' : name,
        'points' : 0,
        'cards' : [],
    });
}

function resetPlayers(name) {
    players = [];
}

function play() {
    players.forEach((player, index) => {
        pullTheCard(index, 2)
    });
    //checkWinner()
    
}

function pullTheCard(index, count = 1) {
    for(i=0; i<count; i++) {
        let card = cards.shift();
        //console.log(players[index],cards)
        players[index].points+=getCardPoints(card.value)
        players[index].cards.push(getCardName(card))
    }
}

function getCardPoints(value) {
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

function getCardName(card) {
    return card.suit[0].toUpperCase() + card.value;
}

function checkWinner() {

    const result = players.filter(player.points == 21);
    console.log(result);
}

router.get('/start', async (req, res) => {
    const url = "https://pickatale-backend-case.herokuapp.com/shuffle";
    resetPlayers();
    cards = await main(url)
    //console.log(cards)
    addPlayer('Annie');
    addPlayer('Bob');
    play();
    console.log(players)
    res.status(200).json({'cards': cards});   
})

module.exports = router