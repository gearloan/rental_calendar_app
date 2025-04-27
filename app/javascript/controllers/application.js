// app/javascript/controllers/application.js

import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-loading"

export const application = Application.start()

const context = require.context(".", true, /\.js$/)
application.load(definitionsFromContext(context))
