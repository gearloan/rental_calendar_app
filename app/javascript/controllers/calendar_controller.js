import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("✅ Calendar controller connected!", this.element)

    const calendar = new window.FullCalendar.Calendar(this.element, {
      initialView: "dayGridMonth",
      events: "/events.json"
    })

    calendar.render()

    // Auto-refresh events every 5 minutes
    setInterval(() => {
        calendar.refetchEvents();
        console.log("✅ Calendar events reloaded");
      }, 5 * 60 * 1000); // every 5 minutes (in milliseconds)
      
  }
}
