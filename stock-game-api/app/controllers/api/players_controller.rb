class Api::PlayersController < ApplicationController
  def index 
    players = Player.all

    render json: players
  end

  def show 
    player = Player.find(params[:id])

    render json: player
  end

  def update 
    player = Player.find(params[:id])

    player.update(player_params)

    render json: player_params
  end

  private

  def player_params 
    params.require(:player).permit(
      :game_id,
      :round,
      :name,
      :money,
      :toilet_paper,
      :hand_soap,
      :frozen_pizza,
      :animal_crossing
    )
  end
  
end
