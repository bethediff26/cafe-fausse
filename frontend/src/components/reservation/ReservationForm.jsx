import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Reservation form for Café Fausse restaurant.
 * Maps to backend API requirements: time_slot (ISO datetime), num_guests, customer_name
 */

const MAX_GUESTS = 8; // Maximum party size per booking at Café Fausse tables
const MIN_GUESTS = 1; // Minimum party size per booking

/**
 * Generate available time slots for a given date.
 * Sundays: 5:00 PM – 8:30 PM (30-min intervals).
 * Monday–Saturday: 5:00 PM – 10:30 PM (30-min intervals).
 */
function generateTimeSlots(date) {
  const dayOfWeek = date.getDay(); // 0 = Sunday
  const endHour = dayOfWeek === 0 ? 21 : 23; // 8:30 PM → hour 21, 10:30 PM → hour 23
  const slots = [];
  for (let h = 17; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return slots;
}


/**
 * Reservation booking form with full validation.
 */
export default function ReservationForm({ initialData = {}, onSubmit: handleSuccess, onSuccess, onAvailabilityCheck }) {
  const [selectedDate, setSelectedDate] = React.useState(initialData.date_selected || new Date());
  const [loading, setLoading] = React.useState(false);

  // Derive available time slots from the selected date so switching the datepicker
  // automatically updates the dropdown options.
  const availableSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

  // Build a Yup schema that validates against the current slot set.
  const reservationSchema = useMemo(
    () =>
      Yup.object({
        name: Yup.string()
          .trim()
          .max(50, 'Name must be under 50 characters')
          .required('Please provide your full name'),
        email: Yup.string()
          .trim()
          .email('Must be a valid email address')
          .required('Please provide your email'),
        phone_number: Yup.string()
          .matches(/^[\d\-\(\)\ ]{5,}$/, 'Enter a valid phone number (hyphens/parens allowed)')
          .nullable(true),
        newsletter_signup: Yup.boolean().oneOf([true, false], 'Newsletter signup must be a boolean'),
        date_selected: Yup.date()
          .min(new Date(), 'Please select a future dining date')
          .required('Date is required'),
        time_slot: Yup.string()
          .oneOf(availableSlots, 'Choose preferred dinner hour from 5pm to {{max}}pm')
          .required('Mealtime selection is required'),
        num_guests: Yup.number()
          .typeError('Guest count must be a number')
          .min(MIN_GUESTS, `Minimum party size is ${MIN_GUESTS}`)
          .max(MAX_GUESTS, `Maximum of ${MAX_GUESTS} guests allowed`),
      }),
    [availableSlots],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reservationSchema),
    defaultValues: { newsletter_signup: false, ...initialData },
    mode: 'onChange',
  });

  if (onAvailabilityCheck) {
    onAvailabilityCheck(selectedDate);
  }

  // Form submission handler using react-hook-form's handleSubmit to intercept and prevent native reload
  const handleFormSubmit = handleSubmit((data) => {
    console.log('Form submitted with data:', data);

    // Combine date and time into ISO datetime string for backend API
    // Backend expects: "YYYY-MM-DDTHH:MM" format (e.g., "2024-12-31T19:30")
    const isoDateTime = `${data.date_selected?.toISOString().split('T')[0]}T${data.time_slot}`;

    if (handleSuccess) {
      // Map form data to backend API payload format
      handleSuccess({
        customer_name: data.name,
        email: data.email,
        phone_number: data.phone_number || null,  // Optional field
        time_slot: isoDateTime,  // Combined ISO datetime string
        num_guests: parseInt(data.num_guests, 10),  // Party size as integer
        table_number: data.table_number || null,  // Backend will auto-assign if not provided (Phase 3)
        newsletter_signup: data.newsletter_signup || false,
      }, () => setLoading(false));

      // Reset form fields on success only (error path stays in parent's .catch)
      reset({
        name: '',
        email: '',
        phone_number: '',
        date_selected: new Date(),
        time_slot: '',
        num_guests: undefined,
        newsletter_signup: false,
      });
      setSelectedDate(new Date());
      onSuccess && onSuccess();
    } else {
      // Fallback: log submission since no onSubmit handler was passed
      console.warn('Reservation form received valid data but no onSubmit callback provided');
      console.log('Form payload:', JSON.stringify({
        customer_name: data.name,        // Mapped from 'name' per backend API spec
        time_slot: isoDateTime,           // Combined date + ISO format for backend
        email: data.email,
        phone_number: data.phone_number || null,
        table_number: data.table_number || null,
        newsletter_signup: data.newsletter_signup || false,
      }, null, 2));

      setLoading(false);
    }
  });

  return (
    <form onSubmit={handleFormSubmit} className="reservation-form">
      <div className="form-header">
        <h2>Book Your Table</h2>
        <p className="subtitle">Join us at Café Fausse for an unforgettable dining experience.</p>
      </div>

      {errors.root && (
        <div className="error-message">
          {Array.isArray(errors.root?.message) ? errors.root.message[0] : errors.root?.message}
        </div>
      )}

      {/* Name Field */}
      <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
        <label htmlFor="name">Full Name *</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="name"
              type="text"
              placeholder="Enter your full name"
              className={`form-input ${errors.name ? 'is-invalid' : ''}`}
            />
          )}
        />
        {errors.name && <span className="error-text">{errors.name.message}</span>}
      </div>

      {/* Email Field */}
      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="email">Email Address *</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="email"
              type="email"
              placeholder="Enter your email address"
              className={`form-input ${errors.email ? 'is-invalid' : ''}`}
            />
          )}
        />
        {errors.email && <span className="error-text">{errors.email.message}</span>}
      </div>

      {/* Phone Field */}
      <div className={`form-group ${errors.phone_number ? 'has-error' : ''}`}>
        <label htmlFor="phone">Phone Number (optional)</label>
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              className={`form-input ${errors.phone_number ? 'is-invalid' : ''}`}
            />
          )}
        />
        {errors.phone_number && <span className="error-text">{errors.phone_number.message}</span>}
      </div>

      {/* Date Field */}
      <div className={`form-group ${errors.date_selected ? 'has-error' : ''}`}>
        <label htmlFor="date">Dining Date *</label>
        <Controller
          name="date_selected"
          control={control}
          render={({ field }) => (
            <ReactDatePicker
              id="date"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                field.onChange(date);
              }}
              placeholderText="Select a future date"
              className={`form-input ${errors.date_selected ? 'is-invalid' : ''}`}
              dateFormat="MMMM d, yyyy"
              minDate={new Date()}
              isClearable
            />
          )}
        />
        {errors.date_selected && <span className="error-text">{errors.date_selected.message}</span>}
      </div>

      {/* Time Slot Field */}
      <div className={`form-group ${errors.time_slot ? 'has-error' : ''}`}>
        <label htmlFor="time">Preferred Time *</label>
        <Controller
          name="time_slot"
          control={control}
          render={({ field }) => (
            <select id="time" value={field.value || ''} onChange={(e) => field.onChange(e.target.value)}>
              <option value="">Select a time</option>
              {availableSlots.map((time) => (
                <option key={time} value={time}>
                  {new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </option>
              ))}
            </select>
          )}
        />
        {errors.time_slot && <span className="error-text">{errors.time_slot.message}</span>}
      </div>

      {/* Guest Count Field */}
      <div className={`form-group ${errors.num_guests ? 'has-error' : ''}`}>
        <label htmlFor="guests">Number of Guests *</label>
        <Controller
          name="num_guests"
          control={control}
          rules={{ required: true, min: MIN_GUESTS, max: MAX_GUESTS }}
          render={({ field }) => (
            <>
              <input
                {...field}
                id="guests"
                type="number"
                value={field.value || ''}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                className={`form-input ${errors.num_guests ? 'is-invalid' : ''}`}
              />
              <div className="guest-counter">
                {[...Array(MAX_GUESTS)].map((_, index) => (
                  <span key={index + 1} className={`${(field.value || 0) >= index + 1 ? 'filled' : 'empty'}`}>●</span>
                ))}
              </div>
            </>
          )}
        />
        {errors.num_guests && <span className="error-text">{errors.num_guests.message}</span>}
      </div>

      {/* Newsletter Signup Checkbox */}
      <div className="flex items-center space-x-2 my-4">
        <Controller
          name="newsletter_signup"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="checkbox"
              id="newsletter_signup"
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-stone-800 focus:ring-stone-500"
            />
          )}
        />
        <label htmlFor="newsletter_signup" className="text-sm text-stone-700">
          Sign me up for the Café Fausse newsletter to receive exclusive updates and menus!
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={loading || Object.keys(errors).length > 0}>
        {loading ? 'Booking...' : 'Complete Reservation'}
      </button>
    </form>
  );
}
