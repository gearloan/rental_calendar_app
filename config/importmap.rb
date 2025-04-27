pin "application", preload: true

pin "@hotwired/stimulus", to: "https://esm.sh/@hotwired/stimulus@3.2.2"
pin "@hotwired/stimulus-loading", to: "https://esm.sh/@hotwired/stimulus-loading@3.2.2"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"

