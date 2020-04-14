document.addEventListener("DOMContentLoaded", (event) => {
    let grid = document.getElementById("board_grid")
    let die = document.querySelector(".die")

    //uses fetch to get data for a game from database
    function fetchGame() {

    }

    //uses fetchGame to add game data to DOM
    function renderGame(json) {

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
                    console.log(`up by ${results.number}`)
                } else {
                    console.log(`down by ${results.number}`)
                }
                break;
            case 2:
                console.log("Canned soup")
                if (results.direction === 1) {
                    console.log(`up by ${results.number}`)
                } else {
                    console.log(`down by ${results.number}`)
                }
                break;
            case 3:
                console.log("Underwear")
                if (results.direction === 1) {
                    console.log(`up by ${results.number}`)
                } else {
                    console.log(`down by ${results.number}`)
                }
                break;
            case 4:
                console.log("stock 4")
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