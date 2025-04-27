class CreateCalendarFeeds < ActiveRecord::Migration[8.0]
  def change
    create_table :calendar_feeds do |t|
      t.string :name
      t.string :url
      t.string :source

      t.timestamps
    end
  end
end
