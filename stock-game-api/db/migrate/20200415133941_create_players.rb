class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.integer :game_id
      t.string :name
      t.integer :money
      t.integer :round
      t.integer :toilet_paper
      t.integer :hand_soap
      t.integer :frozen_pizza
      t.integer :animal_crossing
    end
  end
end
