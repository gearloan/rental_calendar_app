class Booking < ApplicationRecord
  STATUSES = %w[pending confirmed canceled].freeze

  validates :guest_name, :email, :check_in, :check_out, :guests, presence: true
  validates :status, inclusion: { in: STATUSES }
  validate :no_date_overlap

  after_create_commit :notify_host

  scope :confirmed, -> { where(status: "confirmed") }

  NIGHTLY_RATE = 250
  TAX_RATE = 0.10

  def nights
  (check_out - check_in).to_i
  end

  def subtotal
  nights * NIGHTLY_RATE
  end

  def tax
  subtotal * TAX_RATE
  end

  def total
  subtotal + tax
  end


  private

  def no_date_overlap
    overlap = Booking.confirmed.where.not(id: id).where(
      "check_in < ? AND check_out > ?", check_out, check_in
    )
    errors.add(:base, "Those dates are already booked") if overlap.exists?
  end

  def notify_host
    BookingNotifierJob.perform_later(id)
  end
end
