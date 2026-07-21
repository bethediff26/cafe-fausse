import { Link } from 'react-router-dom'
import { IMAGES, RESTAURANT } from '../../data/contact'
import './home.css'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <img
        src={IMAGES.homeHero}
        alt="Elegant dining room at Café Fausse"
        className="hero__image"
      />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">Washington, DC · Fine Dining</p>
        <h1 id="hero-heading" className="hero__title">
          {RESTAURANT.name}
        </h1>
        <p className="hero__subtitle">
          Traditional Italian flavors meet modern culinary innovation in an
          unforgettable dining experience.
        </p>

        <div className="hero__actions">
          <Link to="/reservations" className="hero__cta hero__cta--primary">
            Reserve a Table
          </Link>
          <Link to="/menu" className="hero__cta hero__cta--secondary">
            View Our Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
