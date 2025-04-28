import { Controller } from "@hotwired/stimulus"
import { Calendar } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"

export default class extends Controller {
  static targets = ["calendar"]

  connect() {
    this.calendar = new Calendar(this.calendarTarget, {
      plugins: [dayGridPlugin],
      initialView: "dayGridMonth",
      events: "/events.json",
      eventDisplay: "background",
      firstDay: 0, // Sunday start, or change to 1 for Monday
      eventDidMount: this.handleEventMount.bind(this),
    })

    this.calendar.render()
  }

  handleEventMount(info) {
    const el = info.el;
    const isStart = info.event.extendedProps.isStart;
    const isCheckout = info.event.extendedProps.isCheckout;
    const bgColor = info.event.extendedProps.color || "#93c5fd";
    const bookingId = info.event.id.toString().split('-')[0]; // Extract the booking ID (before the date)
  
    // Base setup for the event container
    el.style.height = "100%";
    el.style.width = "100%";
    el.style.margin = "0";
    el.style.padding = "0";
    el.style.lineHeight = "1";
    el.style.fontSize = "0";
    el.style.border = "none";
    el.style.overflow = "hidden";
    el.style.pointerEvents = "none";
    el.style.background = "transparent";
    el.style.position = "relative"; 
  
    // Create the inner fill element
    const fill = document.createElement('div');
    fill.style.margin = "0";
    fill.style.position = "absolute";
    fill.style.top = "0";
    fill.style.bottom = "0";
    fill.style.pointerEvents = "auto";
    fill.style.transition = "filter 0.2s ease"; // <-- ADD THIS
    fill.dataset.bookingId = bookingId;
    
  
    if (isStart && isCheckout) {
      // Single-day booking
      fill.style.left = "0";
      fill.style.right = "0";
      fill.style.backgroundColor = bgColor;
      fill.style.borderRadius = "9999px";
    } else if (isStart) {
      // Check-in day
      fill.style.right = "0";
      fill.style.width = "30%";
      fill.style.backgroundColor = bgColor;
      fill.style.borderTopLeftRadius = "9999px";
      fill.style.borderBottomLeftRadius = "9999px";
    } else if (isCheckout) {
      // Checkout day
      fill.style.left = "0";
      fill.style.width = "30%";
      fill.style.backgroundColor = bgColor;
      fill.style.borderTopRightRadius = "9999px";
      fill.style.borderBottomRightRadius = "9999px";
    } else {
      // Middle days
      fill.style.left = "0";
      fill.style.right = "0";
      fill.style.backgroundColor = bgColor;
    }
  
    // ✅ New Hover Logic: highlight all fills for same booking
    fill.addEventListener('mouseenter', () => {
      const allFills = document.querySelectorAll(`[data-booking-id='${bookingId}']`);
      allFills.forEach(f => f.style.filter = 'brightness(70%)');
    });
  
    fill.addEventListener('mouseleave', () => {
      const allFills = document.querySelectorAll(`[data-booking-id='${bookingId}']`);
      allFills.forEach(f => f.style.filter = 'brightness(100%)');
    });
  
    el.appendChild(fill);
  
    // OPTIONAL: Fade past events
    if (info.event.start < new Date()) {
      fill.style.opacity = "0.5";
    }
  }
  
}
