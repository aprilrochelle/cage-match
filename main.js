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
    matchBtn.addEventListener('click', grabPlayerName);
}

const grabPlayerName = () => {
    const player1Name = document.getElementById('player1').value;
    player1Xhr(player1Name);
}

function executeOnLoad() {
    const data1 = JSON.parse(this.responseText);
    player2Xhr(data1);
    // playersArray.push(data1);
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