import { IMAGES, RESTAURANT } from '../../data/contact'
import NewsletterSignup from '../newsletter/NewsletterSignup'
import './layout.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div
        className="site-footer__banner"
        style={{ backgroundImage: `url(${IMAGES.cafeInterior})` }}
        role="img"
        aria-label="Café Fausse dining room interior"
      />

      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand-block">
            <img
              src={IMAGES.homeHero}
              alt=""
              className="site-footer__logo"
              width={72}
              height={72}
            />
            <h2 className="site-footer__name">{RESTAURANT.name}</h2>
            <p className="site-footer__tagline">
              Fine dining with Italian tradition and modern innovation.
            </p>
          </div>

          <div className="site-footer__contact">
            <h3 className="site-footer__heading">Visit Us</h3>
            <address className="site-footer__address">
              <p>{RESTAURANT.address}</p>
              <p>
                <a href={`tel:${RESTAURANT.phone.replace(/\D/g, '')}`}>
                  {RESTAURANT.phone}
                </a>
              </p>
            </address>
          </div>

          <div className="site-footer__hours">
            <h3 className="site-footer__heading">Hours</h3>
            <p>{RESTAURANT.hours.weekday}</p>
            <p>{RESTAURANT.hours.sunday}</p>
          </div>

          {/* Newsletter signup (FR-15) */}
          <NewsletterSignup />
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            &copy; {year} {RESTAURANT.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
