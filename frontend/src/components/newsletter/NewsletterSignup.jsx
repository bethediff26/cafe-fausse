import { useState } from 'react';

/**
 * Standalone newsletter signup form (FR-15).
 * Validates email format inline and posts to /api/newsletter.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => EMAIL_REGEX.test(value.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!validateEmail(email)) {
      setStatus('error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      if (!res.ok) {
        const err = await res.json();
        setStatus('error');
        // Store the error message for display
        document.getElementById('newsletter-error').textContent =
          err.error || 'Subscription failed. Please try again.';
        return;
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      document.getElementById('newsletter-error').textContent =
        'Network error. Please check your connection and try again.';
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter-section"
      className="py-16 px-4 bg-gradient-to-br from-stone-800 via-orange-900 to-stone-900 text-white"
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-xl mx-auto text-center">
        <h2 id="newsletter-heading" className="text-3xl font-serif mb-4">
          Stay in the Loop
        </h2>
        <p className="text-lg opacity-90 mb-8">
          Subscribe to our newsletter for exclusive updates, seasonal menus, and special events.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus(null);
              }}
              placeholder="you@example.com"
              aria-label="Email address"
              aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              className={`flex-1 px-4 py-3 rounded-lg text-stone-900 text-lg focus:outline-none focus:ring-2 ${
                status === 'error'
                  ? 'border-2 border-red-400 focus:ring-red-400'
                  : 'border-2 border-transparent focus:ring-orange-400'
              }`}
              disabled={loading}
              required
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {loading ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>

          {/* Inline error message */}
          {status === 'error' && (
            <p
              id="newsletter-error"
              role="alert"
              className="text-red-300 text-sm text-left"
            >
              Please enter a valid email address.
            </p>
          )}

          {/* Success message */}
          {status === 'success' && (
            <p
              role="status"
              className="text-green-300 text-sm text-left"
            >
              Thank you! You&apos;ve been subscribed to the Café Fausse newsletter.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
