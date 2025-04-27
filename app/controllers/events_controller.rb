class EventsController < ApplicationController
  def index
    @events = Event.where(canceled: false)

    respond_to do |format|
      format.html # normal HTML
      format.json do
        render json: @events.map { |event|
          {
            id: event.id,
            title: event.title,
            start: event.start_time.iso8601,
            end: event.end_time.iso8601,
            description: event.description,
            color: event_color(event),
            display: event_display(event)
          }
        }
      end
    end
  end

  def import_from_url
    url = params[:url]
    source = params[:source] || "unknown"

    if url.present? && EventImporter.import_from_url(url, source: source)
      redirect_to events_path, notice: "Events imported successfully!"
    else
      redirect_to events_path, alert: "Error importing events!"
    end
  end

  private

  def event_color(event)
    if event.start_time.to_date < Date.today
      "lightgray" # past events
    else
      "red" # booked events
    end
  end

  def event_display(event)
    if event.start_time.to_date < Date.today
      "background" # show past bookings as background
    else
      "block" # future bookings normal
    end
  end
end
