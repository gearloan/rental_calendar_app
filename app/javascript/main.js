import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", init);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"))
    if (!target) return

    e.preventDefault()

    gsap.to(window, {
      scrollTo: target,
      duration: 0.25,
      ease: "power2.out"
    })
  })
})

function init() {
  const stage = document.querySelector(".stage");
  if (stage) gsap.set(stage, { autoAlpha: 1 });

  const slides = document.querySelectorAll(".slide");
  if (slides.length > 0) {
    initParallax(slides);
    // initSlideAnimations(slides); // Uncomment if/when using that block
  }
}

// --- Animation for scroll-linked parallax images ---
function initParallax(slides) {
  ScrollTrigger.matchMedia({

    // Desktop
    "(min-width: 768px)": function () {
      const triggers = [];
      slides.forEach((slide) => {
        const imageWrappers = slide.querySelectorAll(".home-side-img");

        const tween = gsap.fromTo(
          imageWrappers,
          { y: "-30vh" },
          {
            y: "30vh",
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              snap: false,
              start: "top bottom",
              scrub: true,
            },
          }
        );

        triggers.push(tween.scrollTrigger);
      });

      // Return cleanup to kill triggers on media change
      return () => {
        triggers.forEach(trigger => trigger.kill());
      };
    },
  });
}


// --- Optional full slide animation block (commented for now) ---
function initSlideAnimations(slides) {
  slides.forEach((slide) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: slide,
        start: "40% 50%",
        // markers: true,
      },
    });

    tl.from(slide.querySelectorAll(".col__content-title"), {
      y: "+=5vh",
      duration: 2.5,
      ease: "power4",
    })
      .from(
        slide.querySelectorAll(".line__inner"),
        {
          y: 200,
          duration: 2,
          ease: "power4",
          stagger: 0.1,
        },
        0
      )
      .from(
        slide.querySelectorAll(".col__content-txt"),
        {
          x: 100,
          y: 50,
          opacity: 0,
          duration: 2,
          ease: "power4",
        },
        0.4
      )
      .from(
        slide.querySelectorAll(".slide-link"),
        {
          x: -100,
          y: 100,
          opacity: 0,
          duration: 2,
          ease: "power4",
        },
        0.3
      )
      .from(
        slide.querySelectorAll(".slide__scroll-link"),
        {
          y: 200,
          duration: 3,
          ease: "power4",
        },
        0.4
      )
      .to(
        slide.querySelectorAll(".slide__scroll-line"),
        {
          scaleY: 0.6,
          transformOrigin: "bottom left",
          duration: 2.5,
          ease: "elastic(1,0.5)",
        },
        1.4
      );
  });
}


/* START set vh height at mobile */
window.addEventListener("load", () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
/* END set vh height at mobile */