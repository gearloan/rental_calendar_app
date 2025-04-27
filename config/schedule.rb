set :output, "log/cron.log"

every 1.minutes do
    rake "calendar_feeds:import_all", environment: 'development'
end