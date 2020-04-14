class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.integer :game_id
      t.string :name
      t.integer :money

      t.timestamps
    end
  end
end
