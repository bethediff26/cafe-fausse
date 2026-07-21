/**
 * Available time slots for reservations at Café Fausse.
 * All times are in local restaurant timezone (EST/EDT).
 */

// Helper to create ISO datetime strings for specific evenings with given times
function makeTimeSlots(year = 2025, monthOffset = 0) {
  const baseDate = new Date(year, new Date().getMonth() + monthOffset, 1);

  // Generate time slots in evening hours (restaurant opens at 5 PM)
  return [
    '17:00',   // 5:00 PM - early seating
    '17:30',   // 5:30 PM
    '18:00',   // 6:00 PM - prime time begins
    '18:30',   // 6:30 PM
    '19:00',   // 7:00 PM - peak dining hour
    '19:30',   // 7:30 PM
    '20:00',   // 8:00 PM
    '20:30',   // 8:30 PM - late seating begins (restaurant closes at 11 PM)
    '21:00',   // 9:00 PM
  ];
}

export { makeTimeSlots };
