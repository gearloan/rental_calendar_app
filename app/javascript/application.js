// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

eagerLoadControllersFrom("controllers", application)

window.Stimulus = application
