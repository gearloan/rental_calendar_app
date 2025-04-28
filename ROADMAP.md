# 🛤️ Rental Calendar Roadmap

## 1. Calendar Visual Polish

| Feature | Status |
|:--|:--|
| Full background color per booked day | ✅ Completed |
| Past dates greyed out | ✅ Completed |
| Future booked dates pastel blue | ✅ Completed |
| Available dates clear/white | ✅ Completed |
| Future: Different colors for different sources (Airbnb, VRBO) | 🔜 Planned |

---

## 2. Future-Only Events Display

| Feature | Status |
|:--|:--|
| Hide events that ended before today on user-facing calendar | ✅ Completed |

---

## 3. Feed Import Improvements

| Feature | Status |
|:--|:--|
| Match bookings by UID for updates | ✅ Completed |
| Prevent duplicate identical events | ✅ Completed |

---

## 4. Smart Past Booking Handling

| Feature | Status |
|:--|:--|
| Archive or soft-delete bookings older than 1 year | ✅ Initial complete (manual) |
| Admin-only archive browsing (future) | 🔜 Planned |

---

## 5. Scheduled Feed Sync (Cron)

| Feature | Status |
|:--|:--|
| Auto-fetch .ics feeds via Whenever cron job every few hours | ✅ Completed |
| Log cron outputs cleanly to `log/cron.log` | ✅ Completed |

---

## 6. Admin Tools Foundation

| Feature | Status |
|:--|:--|
| Admin-only calendar view with full-color booking types | 🔜 Planned |
| Ability to cancel, edit, or add manual bookings | 🔜 Planned |
| Differentiated color coding by source for admins | 🔜 Planned |

---

## 7. Bonus: Multi-Source Calendar Merging

| Feature | Status |
|:--|:--|
| Merge Airbnb, VRBO, manual bookings into unified calendar | 🔜 Future Plan |
| Toggle filters by source (ex: show only Airbnb) | 🔜 Future Plan |

---

# 🌟 Overall Progress Summary

| Phase | Status |
|:--|:--|
| Core visual calendar | ✅ Done |
| Basic ICS syncing + cron automation | ✅ Done |
| Frontend hover / UX polish | ✅ Done |
| Admin backend tools | 🔜 In Planning |
| Multi-source calendar merge | 🔜 Future |

---

# 📋 Optional Additions Later

- Create `admin/calendar` route with special admin-only view
- Allow manual event creation/edit/deletion from web UI
- Add user authentication (Devise or similar) for admin separation
- Add conflict detection if overlapping bookings accidentally appear

---

# ✅ Current Status

- Public-facing calendar polished and ready
- Backend ICS syncing reliable
- Future-proof foundation laid