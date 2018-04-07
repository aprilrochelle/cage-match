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
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;
    grabPlayerJson(player1Name, player2Name);
}

const grabPlayerJson = (player1, player2) => {
    const player1Data = `https://teamtreehouse.com/${player1}.json`;
    const player2Data = `https://teamtreehouse.com/${player2}.json`;
    playerXhr(player1Data, player2Data);
}

function executeOnLoad() {
    const data1 = JSON.parse(this.responseText);
    console.log(data1);
}

// function executeAfterPlayer1Load() {
//     const data2 = JSON.parse(this.responseText);
//     console.log(data2);
// }

function executeIfFail() {
    console.log('Something went wrong.');
}

const playerXhr = (playerData1, playerData2) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', executeOnLoad); 
    // {
        // executeOnLoad();
        // player2Xhr(playerData2);
    // });
    myRequest.addEventListener('error', executeIfFail);
    myRequest.open("GET", `${playerData1}`);
    myRequest.send();
}

// const player2Xhr = (playerData2) => {
//     let myOtherRequest = new XMLHttpRequest();
//     myOtherRequest.addEventListener('load', executeAfterPlayer1Load);
//     myOtherRequest.addEventListener('error', executeIfFail);
//     myOtherRequest.open("GET", `${playerData2}`);
//     myOtherRequest.send();
// }

const startApp = () => {
    attachEventListener();
}

startApp();