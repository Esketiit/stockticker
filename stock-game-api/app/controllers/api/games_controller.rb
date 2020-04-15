class Api::GamesController < ApplicationController
  def index 
    games = Game.all 

    render json: games
  end

  def show 
    game = Game.find(params[:id]) 
    

    render json: game
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
