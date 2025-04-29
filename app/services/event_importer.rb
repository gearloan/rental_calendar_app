# app/services/event_importer.rb

require "open-uri"
require "icalendar"

class EventImporter
  def self.import_from_url(url, source:)
    file = URI.open(url)
    calendars = Icalendar::Calendar.parse(file.read)

    calendars.each do |calendar|
      calendar.events.each do |event|

        # Find existing by UID first
        existing_event = Event.find_by(uid: event.uid.to_s) if event.uid.present?

        # If no UID match, fall back to title/start/end match
        if existing_event.nil?
          existing_event = Event.find_by(
            title: event.summary.to_s.presence || "No Title",
            start_time: normalize_datetime(event.dtstart),
            end_time: normalize_datetime(event.dtend),
            source: source.to_s
          )
        end

        if existing_event
          existing_event.update!(
            title: event.summary.to_s.presence || "No Title",
            description: event.description.to_s.presence || "",
            start_time: normalize_datetime(event.dtstart),
            end_time: normalize_datetime(event.dtend),
            canceled: event.status.to_s.downcase == "cancelled",
            source: source.to_s
          )
        else
          Event.create!(
            title: event.summary.to_s.presence || "No Title",
            description: event.description.to_s.presence || "",
            start_time: normalize_datetime(event.dtstart),
            end_time: normalize_datetime(event.dtend),
            source: source.to_s,
            uid: event.uid.to_s.presence,
            canceled: event.status.to_s.downcase == "cancelled"
          )
        end
      end
    end
    true
  rescue => e
    false
  end

  def self.import_from_feed(feed)
    import_from_url(feed.url, source: feed.source)
  end

  def self.import_from_feed_sources
    CalendarFeed.find_each do |feed|
      import_from_feed(feed)
    end
  end

  private

  def self.normalize_datetime(val)
    return unless val
    val.respond_to?(:to_datetime) ? val.to_datetime : val
  end
end

