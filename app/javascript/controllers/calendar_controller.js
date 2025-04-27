// app/javascript/controllers/calendar_controller.js

import { Controller } from "@hotwired/stimulus"
import { Calendar } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import Swal from "sweetalert2"

export default class extends Controller {
  connect() {
    console.log("Calendar controller connected!", this.element)

    const calendar = new Calendar(this.element, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      events: "/events.json",
      eventClick: (info) => {
        info.jsEvent.preventDefault()
        Swal.fire({
          title: info.event.title,
          text: info.event.extendedProps.description || '',
          showCloseButton: true
        })
      }
    })

    calendar.render()
  }
}
