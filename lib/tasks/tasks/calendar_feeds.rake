# lib/tasks/calendar_feeds.rake
namespace :calendar_feeds do
    desc "Re-import all calendar feeds"
    task import_all: :environment do
      CalendarFeed.find_each do |feed|
        puts "Importing #{feed.name}..."
        EventImporter.import_from_feed(feed)
      end
      puts "✅ All feeds re-imported!"
    end
  end
  