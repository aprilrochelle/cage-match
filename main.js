const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const buildDomString = (players) => {
    let domString = '';
    players.forEach((player) => {
        domString += `<div class="player-card">`;
        domString +=    `<h2>${player.name}</h2>`
        domString +=    `<img src="${player.gravatar_url}">`;
        domString +=    `<h3>${player.points.total}</h3>`;
        domString += `</div>`;
    });
    printToDom(domString, "player-holder");
    getWinner(players);
}

const printWinner = (player) => {
    let winnerBoxText = '';
    let winnerBadges = '';
    // winnerBoxText += `<div id="winner-box"`;
    winnerBoxText +=    `<h2>${player.name} is the winner!</h2>`;
    // winnerBoxText += `</div>`;
    printToDom(winnerBoxText, "winner");
    for (let i = 0; i < player.badges.length; i++) {
        winnerBadges += `<div class="col-md-2">`;
        winnerBadges +=     `<div class="badge-card"`;
        winnerBadges +=         `<h5>${player.badges[i].name}</h5>`;
        winnerBadges +=         `<img src="${player.badges[i].icon_url}" class="badge-img">`;
        winnerBadges +=     `</div>`;
        winnerBadges += `</div>`;
    }
    printToDom(winnerBadges, "winner-badges");
}

const getWinner = (players) => {
    let player1score = players[0].points.total;
    let player2score = players[1].points.total;
    if(player1score > player2score) {
        printWinner(players[0]);
    } else {
        printWinner(players[1]);
    }
}

const attachEventListener = () => {
    const matchBtn = document.getElementById('match-btn');
    matchBtn.addEventListener('click', grabPlayerName);
}

const grabPlayerName = () => {
    const player1Name = document.getElementById('player1').value;
    player1Xhr(player1Name);
}

function executeOnLoad() {
    const data1 = JSON.parse(this.responseText);
    player2Xhr(data1);
}

function executeIfFail() {
    console.log('Something went wrong.');
}

const player1Xhr = (player1) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeOnLoad);
    myRequest.addEventListener('error', executeIfFail);
    myRequest.open("GET", `https://teamtreehouse.com/${player1}.json`);
    myRequest.send();
}

const player2Xhr = (player1object) => {
    const player2Name = document.getElementById('player2').value;
    let playersArray = [];
    let myOtherRequest = new XMLHttpRequest();
    myOtherRequest.addEventListener('load', executeAfterPlayer1Load);
    myOtherRequest.addEventListener('error', executeIfFail);
    myOtherRequest.open("GET", `https://teamtreehouse.com/${player2Name}.json`);
    myOtherRequest.send();

        function executeAfterPlayer1Load() {
            const data2 = JSON.parse(this.responseText);
            playersArray.push(player1object, data2);
            buildDomString(playersArray);
        }
}

const startApp = () => {
    attachEventListener();
}

startApp();