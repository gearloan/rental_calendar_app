Rails.application.routes.draw do
  get "bookings/new"
  get "bookings/create"
  get "bookings/index"
  get "bookings/show"
  get "bookings/update"
  get "home/index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "/up", to: proc { [200, {}, ["OK"]] }

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  root "home#index"

  resources :events, only: [:index]

  get "events/import_from_url", to: "events#import_from_url", as: "import_from_url_events"

  resources :bookings, only: [:new, :create, :show, :update]


end

