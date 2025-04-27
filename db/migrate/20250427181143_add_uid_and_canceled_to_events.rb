class AddUidAndCanceledToEvents < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :uid, :string
    add_column :events, :canceled, :boolean, default: false
    add_index :events, :uid
  end
end
