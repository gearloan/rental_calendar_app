require "open-uri"
require "icalendar"

class EventImporter
  def self.import_from_url(url, source:)
    Event.where(source: source).delete_all

    file = URI.open(url)
    calendars = Icalendar::Calendar.parse(file.read)
    calendars.each do |calendar|
      calendar.events.each do |event|
        existing_event = Event.find_by(
          title: event.summary || "No Title",
          start_time: event.dtstart.to_datetime,
          end_time: event.dtend.to_datetime,
          source: source
        )

        unless existing_event
          Event.create!(
            title: event.summary || "No Title",
            description: event.description || "",
            start_time: event.dtstart.to_datetime,
            end_time: event.dtend.to_datetime,
            source: source
          )
        end
      end
    end
    true
  rescue => e
    Rails.logger.error("Error importing ICS: #{e.message}")
    false
  end

  def self.import_from_feed(feed)
    import_from_url(feed.url, source: feed.source)
  end
  
end
