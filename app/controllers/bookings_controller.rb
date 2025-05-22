class BookingsController < ApplicationController
  def new
    @booking = Booking.new
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.status = "pending"

    if @booking.save
      redirect_to booking_path(@booking), notice: "Booking request submitted!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @booking = Booking.find(params[:id])
  end

  # rudimentary admin endpoint to confirm
  def update
    @booking = Booking.find(params[:id])
    @booking.update(status: "confirmed")
    BookingMailer.guest_confirmation(@booking).deliver_later
    redirect_to @booking, notice: "Booking confirmed!"
  end

  private

  def booking_params
    params.require(:booking).permit(
      :guest_name, :email, :check_in, :check_out,
      :guests, :special_requests
    )
  end
end
