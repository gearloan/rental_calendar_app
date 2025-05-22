import "./controllers/cost_controller" // ← this guarantees bundling
import { Application } from "@hotwired/stimulus"

import CalendarController from "./controllers/calendar_controller"
import FlatpickrController from "./controllers/flatpickr_controller"
import GalleryController from "./controllers/gallery_controller"
import CostController from "./controllers/cost_controller"

const application = Application.start()
application.register("calendar", CalendarController)
application.register("flatpickr", FlatpickrController)
application.register("gallery", GalleryController)
application.register("cost", CostController)

window.Stimulus = application

import "./main.js"

import { gsap } from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
