


fetch("http://localhost:3000/api/games")
.then(response => response.json())
.then(games => renderGames(games))

const renderGames = games => {
  games.forEach(renderGame)
}

const renderGame = game => {
  let ul = document.querySelector('#game_stuff')
  let li = document.createElement('li')
  li.innerText = `${game.toilet_paper}`
  ul.append(li)
  

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['Toilet Paper', 'Hand Soap', 'Frozen Pizza', 'Animal Crossing'],
        datasets: [{
            label: 'Quarentine Commodities',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [`${game.toilet_paper}`, `${game.hand_soap}`, `${game.frozen_pizza}`, `${game.animal_crossing}`]
        }]
    },

    // Configuration options go here
    options: {}
});
console.log(game)



 

} // renderGame closing 

fetch("http://localhost:3000/api/players")
.then(response => response.json())
.then(players => {
  console.log(players)  
  renderPlayers(players)})

const renderPlayers = players => {
  console.log(players)
  players.forEach(renderPlayer)
}

const renderPlayer = player => {
  let ul = document.querySelector('#player_stuff')
  let li = document.createElement('li')
  li.innerText = `${player.name} ${player.money} `
  ul.append(li)
}

