import ContactInfo from '../components/home/ContactInfo'
import Hero from '../components/home/Hero'
import Hours from '../components/home/Hours'
import { IMAGES } from '../data/contact'

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />

      <section className="home-visit" aria-labelledby="visit-heading">
        <div className="home-visit__inner">
          <header className="home-visit__header">
            <h2 id="visit-heading" className="home-visit__title">
              Plan Your Visit
            </h2>
            <p className="home-visit__intro">
              Join us for an evening of exceptional cuisine, warm hospitality,
              and the ambiance that has made Café Fausse a destination for fine
              dining in the nation&apos;s capital.
            </p>
          </header>

          <div className="home-visit__grid">
            <ContactInfo />
            <Hours />
          </div>

          <figure className="home-visit__figure">
            <img
              src={IMAGES.cafeInterior}
              alt="Warm interior ambiance of Café Fausse dining room"
              className="home-visit__image"
              loading="lazy"
            />
            <figcaption className="home-visit__caption">
              An inviting atmosphere for every occasion.
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  )
}
