class ChangeEventTimesToDate < ActiveRecord::Migration[7.1]
  def change
    change_column :events, :start_time, :date
    change_column :events, :end_time, :date
  end
end
