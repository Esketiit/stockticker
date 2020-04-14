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
