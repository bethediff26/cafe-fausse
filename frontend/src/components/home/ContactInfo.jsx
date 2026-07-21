import { RESTAURANT } from '../../data/contact'
import './home.css'

export default function ContactInfo() {
  const phoneDigits = RESTAURANT.phone.replace(/\D/g, '')

  return (
    <article className="visit-card">
      <h2 className="visit-card__title">Contact</h2>
      <address className="visit-card__body visit-card__address">
        <p className="visit-card__label">Address</p>
        <p>{RESTAURANT.address}</p>

        <p className="visit-card__label">Phone</p>
        <p>
          <a href={`tel:${phoneDigits}`} className="visit-card__link">
            {RESTAURANT.phone}
          </a>
        </p>
      </address>
    </article>
  )
}
