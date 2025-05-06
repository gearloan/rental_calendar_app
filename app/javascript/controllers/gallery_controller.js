import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    galleries: Object
  }

  connect() {
    console.log("✅ Gallery controller connected")
    document.addEventListener("keydown", this.handleKeydown)
  }

  disconnect() {
    document.removeEventListener("keydown", this.handleKeydown)
  }

  handleKeydown = (event) => {
    if (event.key === "Escape") {
      const modal = this.element.querySelector(".gallery-modal")
      if (modal) modal.classList.add("hidden")
    }
  }

  clickOutside(event) {
    // Only close if clicked directly on the overlay, not child content
    if (event.target.classList.contains("gallery-modal")) {
      event.preventDefault()
      event.stopPropagation()
      event.target.classList.add("hidden")
    }
  }

  open(event) {
    event.preventDefault()
    console.log("✅ open clicked")
  

    const target = event.currentTarget.dataset.galleryTarget
    console.log("🪪 target:", target)

    const images = this.galleriesValue?.[target] || []
    console.log("📸 images to show:", images)

    const container = this.element.querySelector(".gallery-container")
    if (!container) return

    container.innerHTML = ""

    images.forEach((src) => {
      const img = document.createElement("img")
      img.src = src
      img.className = "rounded shadow"
      img.loading = "lazy"
      container.appendChild(img)
    })

    const modal = this.element.querySelector(".gallery-modal")
    if (modal) modal.classList.remove("hidden")
  }

  close(event) {
    const modal = this.element.querySelector(".gallery-modal")
    if (modal) modal.classList.add("hidden")
  }
}
