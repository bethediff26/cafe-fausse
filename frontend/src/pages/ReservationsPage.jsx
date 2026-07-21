import ReservationForm from '../components/reservation/ReservationForm';
import { useState } from 'react';

/**
 * Reservations page for Café Fausse restaurant.
 * Displays the booking form with a clean, minimalist layout.
 */
export default function ReservationsPage() {
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Submit handler that makes an async POST request to /api/reservations
  const handleFormSubmit = (data, onComplete) => {
    console.log('Submitting reservation:', data);

    fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(err => { throw new Error(err.error || 'Reservation submission failed'); });
      }
      return response.json();
    })
    .then((result) => {
      console.log('Reservation submitted successfully!', result);
      setSuccessData(result.reservation);
      setErrorMessage(null);
      onComplete && onComplete();
    })
    .catch((error) => {
      console.error('Error submitting reservation:', error);
      setErrorMessage(error.message || 'Failed to submit your reservation. Please try again later.');
      setSuccessData(null);
      onComplete && onComplete();
    });
  };

  return (
    <main className="page--reservations">
      <section className="form-container">
        <div className="hero-header">
          <h1>Reservations</h1>
          <p className="subtitle">
            Reserve your table at Café Fausse for an intimate dining experience.
          </p>
        </div>

        {errorMessage && (
          <div className="error-banner" role="alert">
            <strong>Booking failed:</strong> {errorMessage}
          </div>
        )}

        {successData && (
          <div className="success-banner" role="status">
            <strong>Reservation confirmed!</strong>
            <p>Table #{successData.table_number}</p>
            <p>{successData.num_guests} guest{successData.num_guests !== 1 ? 's' : ''}</p>
            <p>{new Date(successData.time_slot).toLocaleString()}</p>
          </div>
        )}

        <ReservationForm
          onSubmit={handleFormSubmit}
          onSuccess={() => setSuccessData(null)}
          onAvailabilityCheck={(selectedDate) => {
            // TODO: Check availability with backend API in Phase 3
            console.log('Checking availability for:', selectedDate);
          }}
        />
      </section>
    </main>
  );
}
