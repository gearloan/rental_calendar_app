require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false

  # Fragment caching
  config.action_controller.perform_caching = true

  # Static file server (for /public/**)
  config.public_file_server.enabled = ENV["RAILS_SERVE_STATIC_FILES"].present?
  config.public_file_server.headers = {
    "Cache-Control" => "public, max-age=#{1.year.to_i}"
  }

  # Asset pipeline (not used — images served from public/images)
  config.assets.compile = false

  # Active Storage
  config.active_storage.service = ENV.fetch("ACTIVE_STORAGE_SERVICE", "tigris").to_sym

  # SSL
  config.assume_ssl = true
  config.force_ssl = true
  # config.ssl_options = { redirect: { exclude: ->(request) { request.path == "/up" } } }

  # Logging
  config.log_tags = [ :request_id ]
  config.logger = ActiveSupport::TaggedLogging.logger(STDOUT)
  config.log_level = ENV.fetch("RAILS_LOG_LEVEL", "info")
  config.silence_healthcheck_path = "/up"
  config.active_support.report_deprecations = false

  # Caching & background jobs
  config.cache_store = :solid_cache_store
  config.active_job.queue_adapter = :solid_queue
  config.solid_queue.connects_to = { database: { writing: :queue } }

  # Mailer (stubbed out)
  config.action_mailer.default_url_options = { host: "example.com" }
  # config.action_mailer.raise_delivery_errors = false
  # config.action_mailer.smtp_settings = { ... }

  # I18n
  config.i18n.fallbacks = true

  # ActiveRecord
  config.active_record.dump_schema_after_migration = false
  config.active_record.attributes_for_inspect = [ :id ]

  # Host protection (you can customize if needed)
  # config.hosts = [...]
  # config.host_authorization = { exclude: ->(request) { request.path == "/up" } }
end
