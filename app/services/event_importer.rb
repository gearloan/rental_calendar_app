require "open-uri"
require "icalendar"

class EventImporter
  def self.import_from_url(url, source:)
    puts "DEBUG: starting import_from_url..."
    file = URI.open(url)
    calendars = Icalendar::Calendar.parse(file.read)
    puts "DEBUG: parsed calendars.length = #{calendars.length}"

    # Preload all existing events into a hash
    existing_events = Event.pluck(:title, :start_time, :end_time, :source).map do |title, start_time, end_time, source|
      ["#{title}-#{start_time}-#{end_time}-#{source}", true]
    end.to_h

    calendars.each do |calendar|
      puts "DEBUG: calendar.events.length = #{calendar.events.length}"
      calendar.events.each do |event|
        title = event.summary.to_s.strip.presence || "No Title"
        start_time = (event.dtstart.respond_to?(:to_datetime) ? event.dtstart.to_datetime : event.dtstart).to_date
        end_time = (event.dtend.respond_to?(:to_datetime) ? event.dtend.to_datetime : event.dtend).to_date
        event_source = source.to_s.strip

        event_key = "#{title}-#{start_time}-#{end_time}-#{event_source}"

        unless existing_events[event_key]
          Event.create!(
            title: title,
            description: "",
            start_time: start_time,
            end_time: end_time,
            source: event_source
          )
          existing_events[event_key] = true
          puts "DEBUG: created event #{title} (#{start_time} - #{end_time})"
        else
          puts "DEBUG: skipped duplicate event #{title} (#{start_time} - #{end_time})"
        end
      end
    end

    true
  rescue => e
    puts "ERROR: #{e.class} - #{e.message}"
    false
  end

  def self.import_from_feed(feed)
    import_from_url(feed.url, source: feed.source)
  end
end
