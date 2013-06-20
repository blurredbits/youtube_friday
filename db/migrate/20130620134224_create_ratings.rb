class CreateRatings < ActiveRecord::Migration
  def change
    create_table :rating do |t|
      t.integer :clip_id
      t.integer :rating
      t.timestamps
    end
  end
end
