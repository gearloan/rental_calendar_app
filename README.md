# 🏡 Rental Calendar App

A **Rails 7 + Stimulus + FullCalendar** app to manage and display booking availability for a rental property.

---

# ✨ Features

- 📅 **Beautiful, mobile-friendly calendar**
- 🔄 **Auto-syncs bookings** from Airbnb/VRBO `.ics` feeds
- 🛠️ **Admin tools** to manually import and manage events
- 🔔 **Cron job** (Whenever gem) refreshes feeds every few hours
- 🎨 **Pastel blue highlights** for booked dates, gray for past dates
- 🮨 **Fully customizable UI** planned (Tailwind + GSAP polish phase upcoming)
- 📱 **Responsive layout** for small screens

---

# 🛠️ Tech Stack

| Stack         | Version / Notes                 |
| ------------- | ------------------------------- |
| Ruby on Rails | 7                               |
| Stimulus      | 3                               |
| FullCalendar  | 6 (bundled locally via ESBuild) |
| TailwindCSS   | Planned for final polish        |
| Whenever Gem  | For cron jobs                   |
| Icalendar Gem | For .ics feed parsing           |

---

# ⚙️ Setup Instructions

```bash
bundle install
yarn install
rails db:setup
bin/dev
bundle exec whenever --update-crontab
```

- Cron logs output to `log/cron.log`
- FullCalendar assets are bundled via ESBuild

---

# 🔄 ICS Feed Importing

- Uses `EventImporter` service (`app/services/event_importer.rb`)
- De-duplicates smartly based on:
  - UID
  - Or title/date/source matching fallback
- Imports:
  - `title`
  - `description`
  - `start_time`
  - `end_time`
  - `uid`
  - `canceled` status

---

# 📋 Rails `EventsController#index`

- Expands each booking into **daily "slices"**:
  - Start day
  - Middle days
  - Checkout day
- Sends to FullCalendar with:
  - `isStart`
  - `isCheckout`
- End time treated **inclusively** (covers checkout morning).
- Color and opacity handled dynamically.

---

# 🎨 Front-End (calendar_controller.js)

- FullCalendar `dayGridMonth` view
- `eventDisplay: background`
- Custom `eventDidMount`:
  - Injects an **absolute-positioned pastel fill** into day cells
  - Styles:
    - Check-in ➔ right 30% fill, rounded left
    - Middle ➔ full fill, square corners
    - Checkout ➔ left 30% fill, rounded right
    - Single-day bookings ➔ full pastel pill
  - Past bookings fade to 50% opacity.

---

# 📱 Responsive Tweaks

- Extra padding/margin reduction under 600px screen width
- Slightly taller day squares for easier mobile tapping
- Same hover/fade behaviors on mobile hover-supported devices

---

# 📋 Visual Assumptions

| Rule                     | Details                               |
| ------------------------ | ------------------------------------- |
| Check-in Time            | 3:00 PM                               |
| Checkout Time            | 10:00 AM                              |
| Booking block visualized | Every night stayed + checkout morning |
| Default color            | Pastel blue `#93c5fd`                 |
| Fade past events         | Opacity `0.5`                         |

---

# 🌟 Future Enhancements

| Feature                               | Notes                    |
| ------------------------------------- | ------------------------ |
| Admin UI for manual booking creation  | Planned                  |
| Different colors per booking source   | Planned (VRBO vs Airbnb) |
| Tooltip on hover (show date ranges)   | Easy future enhancement  |
| Animated micro-interactions           | GSAP or CSS3 animations  |
| Inline editing (move/resize bookings) | Optional future          |

---

# 🚀 Status

👉 Core calendar booking system complete.👉 Frontend polish complete.👉 Production-ready foundation.

---

# 🛠️ Developer Tips (Cheatsheet)

## Front-End

| Task                             | How To                                             |
| -------------------------------- | -------------------------------------------------- |
| Change default booking color     | Edit `bgColor` default in `handleEventMount(info)` |
| Change partial fill percentage   | Adjust `width: "30%"` to another value             |
| Adjust hover brightness strength | Modify `filter: brightness(70%)` to taste          |
| Add tooltip on bookings          | Inject a `title` attribute in `handleEventMount`   |
| Change rounding size             | Update `border-radius: 9999px`                     |
| Control transition timing        | Tweak `transition: filter 0.2s ease`               |

## Rails / Backend

| Task                           | How To                                               |
| ------------------------------ | ---------------------------------------------------- |
| Add custom colors per booking  | Add `color` logic to `event_color(event)` method     |
| Change booking expansion logic | Edit `expand_event(event)` in `EventsController`     |
| Change cron job timing         | Edit `schedule.rb` (Whenever gem) and update crontab |
| Log feed import errors         | Check `log/cron.log`                                 |
| Prevent duplicate events       | UID and fallback title/date/source matching active   |

## FullCalendar / Stimulus

| Task                          | How To                                                 |
| ----------------------------- | ------------------------------------------------------ |
| Switch first day of week      | Change `firstDay: 0` to `1`                            |
| Use different calendar view   | Change `initialView: "dayGridMonth"`                   |
| Refresh events without reload | Call `calendar.refetchEvents()`                        |
| Add additional event types    | Tag events.json and handle in `handleEventMount(info)` |

---

# 🛠️ Best Practices

- Avoid overlapping bookings at data import layer.
- Pre-load transition styles to avoid animation jank.
- Avoid text labels inside background events.
- Use `pointer-events: none` on event containers, `auto` on pastel fills.
- Keep pastel fills inside `.fc-event` for compatibility.

---

# 📦 Deployment Quick Notes

- Cron jobs require crontab support (Linux servers)
- NodeJS required for JS bundling (ESBuild)
- PostgreSQL preferred for production environments

---

# 🌟 End of README