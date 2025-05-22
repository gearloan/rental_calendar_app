

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["checkIn", "checkOut", "summary"]

  connect() {
    console.log("CostController connected")
    this.update()
  }

  update() {
    console.log("CostController update called")

    const checkInDate = new Date(this.checkInTarget.value)
    const checkOutDate = new Date(this.checkOutTarget.value)

    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      this.summaryTarget.textContent = "Please select valid dates to see an estimate."
      return
    }

    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    if (nights <= 0) {
      this.summaryTarget.textContent = "Check-out must be after check-in."
      return
    }

    const nightlyRate = 250
    const taxRate = 0.10
    const subtotal = nightlyRate * nights
    const tax = subtotal * taxRate
    const total = subtotal + tax

    this.summaryTarget.innerHTML = `
      ${nights} night${nights > 1 ? 's' : ''} at $${nightlyRate} = $${subtotal.toFixed(2)}<br>
      Tax (10%): $${tax.toFixed(2)}<br>
      <strong>Total: $${total.toFixed(2)}</strong>
    `
  }
}
