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