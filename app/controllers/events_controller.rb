class EventsController < ApplicationController
  def index
    @events = Event.where(canceled: false)

    respond_to do |format|
      format.html
      format.json do
        render json: @events.flat_map { |event|
          expand_event(event)
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

  def expand_event(event)
    (event.start_time.to_date..event.end_time.to_date).map.with_index do |date, idx|
      {
        id: "#{event.id}-#{date}",
        title: event.title,
        start: date,
        allDay: true,
        description: event.description,
        color: event_color(event),
        display: "background",
        isStart: idx == 0,
        isCheckout: date == event.end_time.to_date
      }
    end
  end
  
  
  

  def event_color(event)
    if event.start_time.to_date < Date.today
      "#f3f4f6" # Light gray for past
    else
      "#93c5fd" # Pastel blue for future
    end
  end
end
