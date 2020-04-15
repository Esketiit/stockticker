document.addEventListener("DOMContentLoaded", (event) => {
    let grid = document.querySelector(".grid-container")
    let die = document.querySelector(".die")
    let ani_c = document.getElementById("animal_crossing")
    let toilet = document.getElementById("toilet_paper")
    let soap = document.getElementById("hand_soap")
    let pizza = document.getElementById("frozen_pizza")

    fetchGame()

    function fetchGame() {
        fetch("http://localhost:3000/api/games")
            .then(response => response.json())
            .then(json => renderGame(json))
    }

    //uses fetchGame to add game data to DOM
    function renderGame(game) {
        console.log(game)
        buildGrid()
        //have to change this to find a game from an array of games, eventually
        grid.dataset.id = game[0].id
        pizza.dataset.value = game[0].frozen_pizza
        soap.dataset.value = game[0].hand_soap
        toilet.dataset.value = game[0].toilet_paper
        ani_c.dataset.value = game[0].animal_crossing

        pizza.innerText = `Frozen Pizza Value: ${game[0].frozen_pizza}`
        soap.innerText = `Hand Soap Value: ${game[0].hand_soap}`
        toilet.innerText = `Toilet Paper Value: ${game[0].toilet_paper}`
        ani_c.innerText = `Animal Crossing value: ${game[0].animal_crossing}`
    }

    function buildGrid() {
        let counter = 0
        let grid = document.querySelector('.grid-container')
        while (counter < 40) {
            let div = document.createElement('div')
            div.setAttribute("class", "grid-item")
            grid.appendChild(div)
            counter++
        }
    }

    die.addEventListener("click", (event) => {
        interpretDice()
    })

    //rolls dice and interprets the results
    function interpretDice() {
        let results = rollDice()

        //using the results hash, change the values of each commodity 
        //lots of repeated code, can be put into a function
        switch (results.comodity) {
            case 1:
                if (results.direction === 1) {
                    updateStock(1, "toilet_paper", results.number, grid.dataset.id)
                } else {
                    updateStock(-1, "toilet_paper", results.number, grid.dataset.id)
                }
                break;
            case 2:
                if (results.direction === 1) {
                    updateStock(1, "animal_crossing", results.number, grid.dataset.id)
                } else {
                    updateStock(-1, "animal_crossing", results.number, grid.dataset.id)
                }
                break;
            case 3:
                if (results.direction === 1) {
                    updateStock(1, "frozen_pizza", results.number, grid.dataset.id)
                } else {
                    updateStock(-1, "frozen_pizza", results.number, grid.dataset.id)
                }
                break;
            case 4:
                if (results.direction === 1) {
                    updateStock(1, "hand_soap", results.number, grid.dataset.id)
                } else {
                    updateStock(-1, "hand_soap", results.number, grid.dataset.id)
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

        fetch(`http://localhost:3000/api/games/${game_id}`, {
            method: "POST",
            headers: config,
            body: JSON.stringify({ comodity: newValue })
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