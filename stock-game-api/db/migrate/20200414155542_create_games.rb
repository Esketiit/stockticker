class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :toilet_paper
      t.integer :hand_soap
      t.integer :frozen_pizza
      t.integer :animal_crossing

      t.timestamps
    end
  end
end
