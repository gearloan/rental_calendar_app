import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  startX = null
  swipeThreshold = 50 // pixels

  handlePointerDown = (event) => {
    this.startX = event.clientX
  }

  handlePointerUp = (event) => {
    if (this.startX === null) return
    const deltaX = event.clientX - this.startX

    if (Math.abs(deltaX) > this.swipeThreshold) {
      if (deltaX < 0) {
        // swipe left → next
        this.currentIndex = (this.currentIndex + 1) % this.currentImages.length
        this.renderCurrentImage()
      } else {
        // swipe right → prev
        this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length
        this.renderCurrentImage()
      }
    }

    this.startX = null
  }

  
  static values = {
    galleries: Object
  }

  back() {
    this.renderThumbnailGrid()
  }
  
  renderCurrentImage() {
    const container = this.element.querySelector(".gallery-container")
    if (!container) return
  
    console.log("📊 currentImages:", this.currentImages)
    console.log("🔢 currentIndex:", this.currentIndex)
  
    const index = this.currentIndex
    const src = this.currentImages?.[index]
    console.log("🖼️ full-size src:", src)
  
    container.className = "gallery-container w-full"
    container.innerHTML = ""    

    const wrapper = document.createElement("div")
    wrapper.className = "w-full flex justify-center items-center min-h-[60vh]"

    this.element.querySelector('[data-gallery-target="leftControls"]')?.classList.remove("hidden")
    this.element.querySelector('[data-gallery-target="rightControls"]')?.classList.remove("hidden")


    const img = document.createElement("img")
    img.src = src
    img.className = "max-h-[80vh] max-w-full object-contain rounded shadow"
    img.loading = "lazy"
  
    wrapper.appendChild(img)
    container.appendChild(wrapper)

    const title = this.element.querySelector('[data-gallery-target="title"]')
    if (title) title.textContent = `Image ${this.currentIndex + 1} of ${this.currentImages.length}`

    const nav = this.element.querySelector('[data-gallery-target="navButtons"]')
    if (nav) nav.classList.remove("hidden")

  }
  
  renderThumbnailGrid() {
    this.currentIndex = null
  
    const nav = this.element.querySelector('[data-gallery-target="navButtons"]')
    if (nav) nav.classList.add("hidden")

    const container = this.element.querySelector(".gallery-container")
    if (!container) return
    container.className = "gallery-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    container.innerHTML = ""
  
    this.element.querySelector('[data-gallery-target="leftControls"]')?.classList.add("hidden")
    this.element.querySelector('[data-gallery-target="rightControls"]')?.classList.add("hidden")


    this.currentImages.forEach((src, i) => {
      const wrapper = document.createElement("div")
      wrapper.className = "aspect-[4/3] overflow-hidden rounded shadow cursor-pointer"
      wrapper.dataset.action = "click->gallery#select"
      wrapper.dataset.index = i
  
      const img = document.createElement("img")
      img.src = src
      img.className = "max-h-[80vh] max-w-full object-contain rounded shadow opacity-0 transition-opacity duration-500"
      img.loading = "lazy"
  
      img.addEventListener("load", () => {
        img.classList.remove("opacity-0")
      })     
      
      const preload = (index) => {
        const src = this.currentImages?.[index]
        if (!src) return
        const img = new Image()
        img.src = src
      }
      
      preload(this.currentIndex + 1)
      preload(this.currentIndex - 1)

      wrapper.appendChild(img)
      container.appendChild(wrapper)
    })
    const title = this.element.querySelector('[data-gallery-target="title"]')
    if (title) title.textContent = "Gallery"

  }
  
  prev() {
    if (this.currentIndex == null) return
    this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length
    this.renderCurrentImage()
  }
  
  next() {
    if (this.currentIndex == null) return
    this.currentIndex = (this.currentIndex + 1) % this.currentImages.length
    this.renderCurrentImage()
  }
  

  connect() {
    console.log("✅ Gallery controller connected")
    this.currentImages = []
    this.currentIndex = null
    document.addEventListener("keydown", this.handleKeydown)

    this.modal = this.element.querySelector(".gallery-modal")
    this.modal.addEventListener("pointerdown", this.handlePointerDown)
    this.modal.addEventListener("pointerup", this.handlePointerUp)

  }

  disconnect() {
    document.removeEventListener("keydown", this.handleKeydown)
    this.modal.removeEventListener("pointerdown", this.handlePointerDown)
    this.modal.removeEventListener("pointerup", this.handlePointerUp)
  }

  handleKeydown = (event) => {
    const modal = this.element.querySelector(".gallery-modal")
    if (!modal || modal.classList.contains("hidden")) return
  
    if (event.key === "Escape") {
      modal.classList.add("hidden")
      return
    }
  
    if (this.currentIndex == null || !this.currentImages?.length) return
  
    if (event.key === "ArrowRight") {
      this.currentIndex = (this.currentIndex + 1) % this.currentImages.length
      this.renderCurrentImage()
    }
  
    if (event.key === "ArrowLeft") {
      this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length
      this.renderCurrentImage()
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
    const target = event.currentTarget.dataset.galleryTarget
    const images = this.galleriesValue?.[target] || []
    if (images.length === 0) return
  
    this.currentImages = images
    this.currentIndex = null
    this.renderThumbnailGrid()
  
    const modal = this.element.querySelector(".gallery-modal")
    if (modal) modal.classList.remove("hidden")
  }
  
  select(event) {
    const index = parseInt(event.currentTarget.dataset.index, 10)
    this.currentIndex = index
    this.renderCurrentImage()
  }  
  

  close(event) {
    const modal = this.element.querySelector(".gallery-modal")
    if (modal) modal.classList.add("hidden")
  }
}
