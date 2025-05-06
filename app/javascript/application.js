import { Application } from "@hotwired/stimulus"

import CalendarController from "./controllers/calendar_controller"
import FlatpickrController from "./controllers/flatpickr_controller"
import GalleryController from "./controllers/gallery_controller" // ✅ Add this

window.Stimulus = Application.start()
Stimulus.register("calendar", CalendarController)
Stimulus.register("flatpickr", FlatpickrController)
Stimulus.register("gallery", GalleryController) // ✅ Register it

//import "../assets/stylesheets/application.tailwind.css"
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

import "./main.js"
