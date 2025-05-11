set :output, "log/cron.log"

set :environment, ENV['RAILS_ENV'] || 'development'

every 3.hours do
  rake "calendar_feeds:import_all"
end