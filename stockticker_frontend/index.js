document.addEventListener("DOMContentLoaded", (event) => {
    let grid = document.querySelector(".grid-container")
    let die = document.querySelector(".die")
    let animal = document.getElementById("animal_crossing")
    let toilet = document.getElementById("toilet_paper")
    let soap = document.getElementById("hand_soap")
    let pizza = document.getElementById("frozen_pizza")
    let round = document.getElementById("round_counter")
    let turnButton = document.getElementById("end_turn")
    let playerList = document.getElementById("players")
    let players = 0

    fetchGame()
    let roundValue = parseInt(round.innerText)

    die.addEventListener("click", (event) => {
        interpretDice()
    })

    function isEven(num) {
        if (num % 2 === 0 && num > 0) {
            return true
        } else {
            return false
        }
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
            // console.log(player.id)
        })
        players = gameArr[0].players.length

        playerList.dataset.id = game.id
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
    }

    function createPlayerDiv(player) {
        //div that holds data and buttons for a given player
        let playerDiv = document.createElement('div')
        playerDiv.dataset.id = player.id
        playerDiv.setAttribute("disabled", "true")
        //h4 that shows player name
        let playerName = document.createElement('h4')
        playerName.innerText = `${player.name}`

        //button that end the players turn
        let turnButton = document.createElement('button')
        turnButton.setAttribute("id", "end_turn")
        turnButton.innerText = "End Turn"

        //div and button that handles the players pizza stock
        let pizzaStock = document.createElement('div')
        pizzaStock.setAttribute("id", "pizza_stock")
        pizzaStock.dataset.amount = player.frozen_pizza
        pizzaStock.innerText = `Frozen Pizza Stocks: ${player.frozen_pizza} `
        let pizzaButton = document.createElement("button")
        pizzaButton.setAttribute("id", "buy_pizza")
        pizzaButton.innerText = "Buy 10 Frozen Pizza"
        pizzaStock.append(pizzaButton)

        //div and button that handle the players toilet paper stock
        let toiletStock = document.createElement('div')
        toiletStock.setAttribute("id", "toilet_stock")
        toiletStock.dataset.amount = player.toilet_paper
        toiletStock.innerText = `Toilet Paper Stocks: ${player.toilet_paper} `
        let toiletButton = document.createElement("button")
        toiletButton.setAttribute("id", "buy_toilet")
        toiletButton.innerText = "Buy 10 Toilet Paper"
        toiletStock.append(toiletButton)

        //div and button handles the players animal crossing stock
        let animalStock = document.createElement('div')
        animalStock.setAttribute("id", "animal_stock")
        animalStock.dataset.amount = player.animal_crossing
        animalStock.innerText = `Animal Crossing Stocks: ${player.animal_crossing} `
        let animalButton = document.createElement("button")
        animalButton.setAttribute("id", "buy_animal")
        animalButton.innerText = "Buy 10 Animal Crossing"
        animalStock.append(animalButton)

        //Hand Soap
        let soapStock = document.createElement("div")
        soapStock.setAttribute("id", "soap_stock")
        soapStock.dataset.amount = player.hand_soap
        soapStock.innerText = `Hand Soap Stocks: ${player.hand_soap} `
        let soapButton = document.createElement("button")
        soapButton.setAttribute("id", "buy_soap")
        soapButton.innerText = "Buy 10 Hand Soap"
        soapStock.append(soapButton)

        playerDiv.append(playerName, turnButton, pizzaStock, toiletStock, animalStock, soapStock)
        playerList.appendChild(playerDiv)
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
        fetch(`http://localhost:3000/api/games/${parseInt(game_id)}`, {
            method: "PATCH",
            headers: config,
            body: JSON.stringify({ "game": { [comodity]: newValue } })
        })
            .then(resp => resp.json())
            .then(data => console.log(data))

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