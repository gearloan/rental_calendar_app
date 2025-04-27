// app/javascript/controllers/flatpickr_controller.js

import { Controller } from "@hotwired/stimulus"
import flatpickr from "flatpickr"

export default class extends Controller {
  connect() {
    console.log("Flatpickr controller connected!", this.element)

    flatpickr(this.element, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
    })
  }
}
