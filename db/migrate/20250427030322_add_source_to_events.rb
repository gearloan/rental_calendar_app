class AddSourceToEvents < ActiveRecord::Migration[8.0]
  def change
    add_column :events, :source, :string
  end
end
