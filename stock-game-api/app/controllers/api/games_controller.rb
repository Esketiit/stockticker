class Api::GamesController < ApplicationController
  def index 
    games = Game.all 
    gamesArr = games.map {|game| {"game": game, "players": game.players}}
    render json: gamesArr
  end

  def show 
    game = Game.find(params[:id]) 
    data = {
      "game": game,
      "players": game.players
    }
    

    render json: data
  end

  def update 
    game = Game.find(params[:id])

    game.update(game_params)

    render json: game
  end

  private

  def game_params 
    params.require(:game).permit(
      :id,
      :toilet_paper,
      :hand_soap,
      :frozen_pizza,
      :animal_crossing
    )
  end
end
