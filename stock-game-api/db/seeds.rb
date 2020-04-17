# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Game.destroy_all 
Player.destroy_all

game = {
  "id": 1,
  "toilet_paper": 150,
  "hand_soap": 100,
  "frozen_pizza": 75,
  "animal_crossing": 50,
  "round": 8
}


new_game = Game.create(game)

players = [
  { 
    "game_id": new_game.id,
    "name": "Joseph(Player1)", 
    "money": 4300,
    "round": 8,
    "toilet_paper": 0,
    "hand_soap": 0,
    "frozen_pizza": 0,
    "animal_crossing": 0

   },

{ 
  "game_id": new_game.id,
  "round": 8,
  "name": "Brian(Player2)", 
  "money": 5000,
  "toilet_paper": 0,
  "hand_soap": 0,
  "frozen_pizza": 0,
  "animal_crossing": 0
  
  }
]

players.each {|player| Player.create!(player)}
   
