class CreateBookings < ActiveRecord::Migration[8.0]
  def change
    create_table :bookings do |t|
      t.string :guest_name
      t.string :email
      t.date :check_in
      t.date :check_out
      t.integer :guests
      t.text :special_requests
      t.string :status

      t.timestamps
    end
  end
end
