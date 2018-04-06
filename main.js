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
    
}

function executeIfFail() {
    console.log('Something went wrong.');
}

const xhrCall = (userName, successFunction) => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener('load', successFunction);
    myRequest.addEventListener('error', executeIfFail);
    myRequest.open("GET", `https://teamtreehouse.com/${username}.json`);
    myRequest.send();
}

const startApp = () => {
    attachEventListener();
}

startApp();