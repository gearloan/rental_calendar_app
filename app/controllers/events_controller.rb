class EventsController < ApplicationController
    def index
      @events = Event.all
  
      respond_to do |format|
        format.html # if people visit /events in browser
        format.json do
          render json: @events.map { |event|
            {
              id: event.id,
              title: event.title,
              start: event.start_time,
              end: event.end_time,
              description: event.description
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
      
      
  end
  