import { Application } from "@hotwired/stimulus"

// No more definitionsFromContext needed!!

import CalendarController from "./controllers/calendar_controller"
import FlatpickrController from "./controllers/flatpickr_controller"

window.Stimulus = Application.start()
Stimulus.register("calendar", CalendarController)
Stimulus.register("flatpickr", FlatpickrController)

import "../assets/stylesheets/application.tailwind.css"
