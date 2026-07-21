import { RESTAURANT } from '../../data/contact'
import './home.css'

export default function Hours() {
  return (
    <article className="visit-card">
      <h2 className="visit-card__title">Hours</h2>
      <div className="visit-card__body">
        <p className="visit-card__label">Dinner Service</p>
        <ul className="visit-card__hours-list">
          <li>{RESTAURANT.hours.weekday}</li>
          <li>{RESTAURANT.hours.sunday}</li>
        </ul>
      </div>
    </article>
  )
}
