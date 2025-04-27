set :output, "log/cron.log"

set :environment, ENV['RAILS_ENV'] || 'development'

every 5.minutes do
  rake "calendar_feeds:import_all"
end