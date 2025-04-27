import { Calendar } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Controller } from "@hotwired/stimulus"


import Swal from "sweetalert2"




export default class extends Controller {
  connect() {
    console.log("✅ Calendar controller connected!", this.element)

    const calendar = new Calendar(this.element, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      events: "/events.json",
      eventClick: function(info) {
        info.jsEvent.preventDefault()

        Swal.fire({
          title: info.event.title,
          html: `
            <strong>Start:</strong> ${info.event.start.toLocaleString()}<br/>
            <strong>End:</strong> ${info.event.end ? info.event.end.toLocaleString() : 'N/A'}<br/>
            <strong>Description:</strong> ${info.event.extendedProps.description || 'No description'}
          `,
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'View Details',
          cancelButtonText: 'Close'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/events/${info.event.id}`
          }
        })
      },
      eventDidMount: function(info) {
        if (info.event.extendedProps.color) {
          info.el.style.backgroundColor = info.event.extendedProps.color
        }
        if (info.event.extendedProps.display === "background") {
          info.el.style.opacity = 0.4
          info.el.style.pointerEvents = "none"
        }
      }
    })

    calendar.render()
  }
}
