





document.addEventListener("DOMContentLoaded", (event) => {
    let die = document.querySelector(".die")
    let animal = document.getElementById("animal_crossing")
    let toilet = document.getElementById("toilet_paper")
    let soap = document.getElementById("hand_soap")
    let pizza = document.getElementById("frozen_pizza")
    let round = document.getElementById("round_counter")
    let turnButton = document.getElementById("end_turn")
    let playerList = document.getElementById("players")

    fetchGame()

    die.addEventListener("click", (event) => {
        interpretDice()
        if (round.dataset.value > 1) {
            round.dataset.value--
            round.innerText = `Round Left: ${round.dataset.value}`
        } else {
            round.dataset.value--
            round.innerText = `Round Left: ${round.dataset.value}`
            console.log("end the game")
        }
    })

    playerList.addEventListener("click", (event) => {
        if (event.target.className === "buy") {
            buyStock(event.target, event.target.parentNode)
        }
        // else if (event.target.className === "sell") {
        //     console.log(event.target.id)
        // }
    })

    function buyStock(commodityDiv, playerDiv) {
        let currentAmount = commodityDiv.previousSibling.dataset.amount
        let currentCash = playerDiv.childeren
        let config = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        console.log(cash)
        console.log(commodityDiv)
        console.log(playerDiv)

        // fetch(`http://localhost:3000/api/players/${playerDiv.dataset.id}`, {
        //     method: "POST",
        //     headers: config,
        //     body: JSON.stringify({ [commodity]: card.dataset.id })
        // })
        //     .then(resp => resp.json())
        //     .then(data => console.log(data))

    }

    function sellStock(commodity, playerDiv) {

    }

    function fetchGame() {
        fetch("http://localhost:3000/api/games")
            .then(response => response.json())
            .then(gameArr => renderGame(gameArr))
    }

    function renderGame(gameArr) {
        let game = gameArr[0].game
        gameArr[0].players.forEach(player => {
            createPlayerDiv(player)
        })

        playerList.dataset.game_id = game.id
        pizza.dataset.value = game.frozen_pizza
        soap.dataset.value = game.hand_soap
        toilet.dataset.value = game.toilet_paper
        animal.dataset.value = game.animal_crossing
        round.dataset.value = game.round


        pizza.innerText = `Frozen Pizza Value: ${game.frozen_pizza}`
        soap.innerText = `Hand Soap Value: ${game.hand_soap}`
        toilet.innerText = `Toilet Paper Value: ${game.toilet_paper}`
        animal.innerText = `Animal Crossing Value: ${game.animal_crossing}`
        round.innerText = `Rounds Left: ${game.round}`

        
        getChart(game)
    }

    function createPlayerDiv(player) {
        //div that holds data and buttons for a given player
        let playerDiv = document.createElement('div')
        playerDiv.dataset.id = player.id
        playerDiv.setAttribute("class", "player")
        //h4 that shows player name
        let playerName = document.createElement('h4')
        playerName.innerText = `${player.name}`
        playerDiv.append(playerName)

        //shows players cash
        let cash = document.createElement('p')
        cash.setAttribute("id", "cash")
        cash.dataset.amount = player.money
        cash.innerText = `Money: ${player.money}`
        playerDiv.append(cash)

        //div and button that handles the players pizza stock
        let pizzaStock = document.createElement('div')
        pizzaStock.setAttribute("id", "pizza_stock")
        pizzaStock.dataset.amount = player.frozen_pizza
        pizzaStock.innerText = `Frozen Pizza Stocks: ${player.frozen_pizza} `
        playerDiv.append(pizzaStock)
        let pizzaBuy = document.createElement("button")
        pizzaBuy.setAttribute("id", "buy_pizza")
        pizzaBuy.innerText = "Buy 10 Frozen Pizza"
        pizzaBuy.setAttribute("class", "buy")
        playerDiv.append(pizzaBuy)

        //div and button that handle the players toilet paper stock
        let toiletStock = document.createElement('div')
        toiletStock.setAttribute("id", "toilet_stock")
        toiletStock.dataset.amount = player.toilet_paper
        toiletStock.innerText = `Toilet Paper Stocks: ${player.toilet_paper} `
        playerDiv.append(toiletStock)
        let toiletBuy = document.createElement("button")
        toiletBuy.setAttribute("id", "buy_toilet")
        toiletBuy.innerText = "Buy 10 Toilet Paper"
        toiletBuy.setAttribute("class", "buy")
        playerDiv.append(toiletBuy)

        //div and button handles the players animal crossing stock
        let animalStock = document.createElement('div')
        animalStock.setAttribute("id", "animal_stock")
        animalStock.dataset.amount = player.animal_crossing
        animalStock.innerText = `Animal Crossing Stocks: ${player.animal_crossing} `
        playerDiv.append(animalStock)
        let animalBuy = document.createElement("button")
        animalBuy.setAttribute("id", "buy_animal")
        animalBuy.innerText = "Buy 10 Animal Crossing"
        animalBuy.setAttribute("class", "buy")
        playerDiv.append(animalBuy)

        //Hand Soap
        let soapStock = document.createElement("div")
        soapStock.setAttribute("id", "soap_stock")
        soapStock.dataset.amount = player.hand_soap
        soapStock.innerText = `Hand Soap Stocks: ${player.hand_soap} `
        playerDiv.append(soapStock)
        let soapBuy = document.createElement("button")
        soapBuy.setAttribute("id", "buy_soap")
        soapBuy.innerText = "Buy 10 Hand Soap"
        soapBuy.setAttribute("class", "buy")
        playerDiv.append(soapBuy)

        // playerDiv.append(playerName, turnButton, cash, pizzaStock, toiletStock, animalStock, soapStock)
        playerList.append(playerDiv)
    }


    //rolls dice and interprets the results
    function interpretDice() {
        let results = rollDice()

        //using the results hash, change the values of each commodity 
        //lots of repeated code, can be put into a function
        switch (results.comodity) {
            case 1:
                if (results.direction === 1) {
                    updateStock(1, "toilet_paper", results.number, playerList.dataset.id)
                } else {
                    updateStock(-1, "toilet_paper", results.number, playerList.dataset.id)
                }
                break;
            case 2:
                if (results.direction === 1) {
                    updateStock(1, "animal_crossing", results.number, playerList.dataset.id)
                } else {
                    updateStock(-1, "animal_crossing", results.number, playerList.dataset.id)
                }
                break;
            case 3:
                if (results.direction === 1) {
                    updateStock(1, "frozen_pizza", results.number, playerList.dataset.id)
                } else {
                    updateStock(-1, "frozen_pizza", results.number, playerList.dataset.id)
                }
                break;
            case 4:
                if (results.direction === 1) {
                    updateStock(1, "hand_soap", results.number, playerList.dataset.id)
                } else {
                    updateStock(-1, "hand_soap", results.number, playerList.dataset.id)
                }
                break;
        }
    }

    function updateStock(direction, comodity, change, game_id) {
        let stock = document.getElementById(comodity)
        let currentValue = parseInt(stock.dataset.value)
        let newValue = parseInt(currentValue) + (change * 25 * direction)
        let config = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        if (newValue > 500) {
            console.log(`Max value for ${comodity}`)
            newValue = 250
        } else if (newValue < 0) {
            console.log(`Min value for ${comodity}`)
            newValue = 250
        }
        stock.dataset.value = newValue
        stock.innerText = `${comodity} value: ${newValue}`

        console.log(comodity)
        fetch(`http://localhost:3000/api/games/${parseInt(playerList.dataset.game_id)}`, {
            method: "PATCH",
            headers: config,
            body: JSON.stringify({ "game": { [comodity]: newValue } })
        })
            .then(resp => resp.json())
            .then(game => getChart(game))

    }

    //helper function that returns an object
    function rollDice() {
        let results = {}
        results.comodity = diceRoll(4)
        results.number = diceRoll(4)
        results.direction = diceRoll(2)

        return results
    }

    //helper function the returns a random number between 1 and 'num'
    function diceRoll(num) {
        return Math.floor(Math.random() * num) + 1
    }
})











function getChart(game) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
    
      // The data for our dataset
      data: {
          labels: ['Toilet Paper', 'Hand Soap', 'Frozen Pizza', 'Animal Crossing'],
          datasets: [{
              label: 'Quarentine Commodities',
              backgroundColor: 'rgb(0, 200, 200)',
              borderColor: 'rgb(255, 20, 200)',
              borderWidth: 5,
              steppedLine: true,
              pointStyle: 'triangle',
              
              data: [`${game.toilet_paper}`, `${game.hand_soap}`, `${game.frozen_pizza}`, `${game.animal_crossing}`]
          }]
      },
    
      // Configuration options go here
      options: {}
    })

}