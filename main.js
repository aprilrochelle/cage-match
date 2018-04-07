let player1Name = '';
let player2Name = '';

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
}

const attachEventListener = () => {
    const matchBtn = document.getElementById('match-btn');
    matchBtn.addEventListener('click', grabPlayerNames);
}

const grabPlayerNames = () => {
    player1Name = document.getElementById('player1').value;
    player2Name = document.getElementById('player2').value;
    grabPlayerJson(player1Name, player2Name);
}

const grabPlayerJson = (player1, player2) => {
    const player1Data = `"https://teamtreehouse.com/${player1}.json"`;
    const player2Data = `"https://teamtreehouse.com/${player2}.json"`;
    playerXhrCall(player1Data);
}

function executeOnLoad() {
    const data1 = JSON.parse(this.responseText);
    console.log(data1);
}

function executeIfFail() {
    console.log('Something went wrong.');
}

const playerXhrCall = (playerData) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeOnLoad);
    myRequest.addEventListener('error', executeIfFail);
    myRequest.open("GET", playerData);
    myRequest.send();
}

const startApp = () => {
    attachEventListener();
}

startApp();