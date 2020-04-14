document.addEventListener("DOMContentLoaded", (event) => {
    let grid = document.getElementById("board_grid")
    let die = document.querySelector(".die")
    let ani_c = document.getElementById("animal_crossing")
    let toilet = document.getElementById("toilet_paper")
    let soap = document.getElementById("hand_soap")
    let pizza = document.getElementById("frozen_pizza")

    fetchGame()

    function buildGrid() {
        let counter = 0
        let grid = document.querySelector('.grid-container')
        while (counter < 40) {
            let div = document.createElement('div')
            div.setAttribute("class", "grid-item")
            grid.appendChild(div)
            console.log(counter)
            counter++
        }
    }

    //uses fetch to get data for a game from database
    function fetchGame() {
        fetch("http://localhost:3000/api/games")
            .then(response => response.json())
            .then(json => renderGame(json))
    }

    //uses fetchGame to add game data to DOM
    function renderGame(game) {
        console.log(game)
        buildGrid()

        pizza.dataset.value = game[0].frozen_pizza
        soap.dataset.value = game[0].hand_soap
        toilet.dataset.value = game[0].toilet_paper
        ani_c.dataset.value = game[0].animal_crossing

        pizza.innerText = `Frozen Pizza Value: ${game[0].frozen_pizza}`
        soap.innerText = `Hand Soap Value: ${game[0].hand_soap}`
        toilet.innerText = `Toilet Paper Value: ${game[0].toilet_paper}`
        ani_c.innerText = `Animal Crossing value: ${game[0].animal_crossing}`
    }

    die.addEventListener("click", (event) => {
        interpretDice()
    })

    //rolls dice and interprets the results
    function interpretDice() {
        let results = rollDice()

        //using the results hash, change the values of each commodity 
        switch (results.comodity) {
            case 1:
                console.log("Toilet Paper")
                if (results.direction === 1) {
                    toilet.dataset.value++
                } else {
                    console.log(`down by ${results.number}`)
                }
                break;
            case 2:
                console.log("Animal Crossing")
                if (results.direction === 1) {
                    console.log(`up by ${results.number}`)
                } else {
                    console.log(`down by ${results.number}`)
                }
                break;
            case 3:
                console.log("Frozen Pizza")
                if (results.direction === 1) {
                    console.log(`up by ${results.number}`)
                } else {
                    console.log(`down by ${results.number}`)
                }
                break;
            case 4:
                console.log("Hand Soap")
                if (results.direction === 1) {
                    console.log(`up by ${results.number}`)
                } else {
                    console.log(`down by ${results.number}`)
                }
                break;
        }
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