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
}

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
