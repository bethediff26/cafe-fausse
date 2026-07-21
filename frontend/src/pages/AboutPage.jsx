import FounderBio from '../components/about/FounderBio';

export default function AboutPage() {
  return (
    <div className="page page--about">
      {/* Hero Section */}
      <section className="about-hero text-center py-16 px-4 bg-gradient-to-br from-stone-800 via-orange-900 to-stone-900 text-white">
        <h1 className="text-5xl font-bold mb-6 tracking-wide">About Café Fausse</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed opacity-90">
          Where tradition meets innovation in every bite.
        </p>
      </section>

      {/* Our Story Section */}
      <section className="about-story py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-stone-800">Our Story</h2>

          {/* Split layout: story + image */}
          <article className="flex flex-col md:flex-row gap-x-12 items-start my-16">
            <div className="md:w-1/2 order-2 md:order-1">
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. What began as a passion project has grown into one of Washington DC&apos;s most celebrated dining destinations.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                Our mission is to provide an unforgettable dining experience that reflects both quality and creativity. Every dish we serve tells a story—a story passed down through generations of Italian culinary tradition, reimagined with contemporary techniques and the freshest ingredients available today.
              </p>
            </div>

            <figure className="md:w-1/2 order-1 md:order-2">
              <img
                src="/images/gallery-cafe-interior.webp"
                alt="Café Fausse dining room interior with warm lighting and elegant table settings"
                className="w-full h-auto rounded-lg shadow-xl"
                loading="lazy"
              />
              <figcaption className="text-center text-sm text-stone-500 mt-3 italic">
                Our inviting dining space, where every detail is thoughtfully curated.
              </figcaption>
            </figure>
          </article>

          {/* Core Values Grid */}
          <section aria-labelledby="values-heading" className="my-16 pt-8 border-t border-stone-200">
            <h3 id="values-heading" className="text-2xl font-bold text-center mb-4 text-stone-800">Our Commitment</h3>

            <div className="grid md:grid-cols-3 gap-x-16 gap-y-8 mt-8">
              {/* Value 1 */}
              <article className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200">
                <h4 className="text-lg font-semibold text-orange-950 mb-2">Fresh Ingredients</h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  We source our ingredients daily from trusted local farms, ensuring peak flavor and quality in every component that reaches your plate.
                </p>
              </article>

              {/* Value 2 */}
              <article className="text-center p-6 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors duration-200">
                <h4 className="text-lg font-semibold text-stone-950 mb-2">Creativity &amp; Craft</h4>
                <p className="text-sm text-stone-700 leading-relaxed">
                  Our chefs are constantly innovating, developing new dishes and refining old favorites to create memorable culinary experiences.
                </p>
              </article>

              {/* Value 3 */}
              <article className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200">
                <h4 className="text-lg font-semibold text-orange-950 mb-2">Service Excellence</h4>

                <p className="text-sm text-stone-700 leading-relaxed">
                  Our team is dedicated to providing warm, attentive hospitality. We believe exceptional service transforms a meal into an experience.
                </p>
              </article>
            </div>
          </section>

          {/* Additional paragraph for about section */}
          <aside className="mt-12 text-center">
            <h3 id="philosophy-heading" className="text-xl font-semibold mb-4 text-stone-800">Our Philosophy</h3>
            <blockquote className="max-w-2xl mx-auto italic text-lg leading-relaxed bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border-l-4 border-orange-700 my-8 font-medium text-stone-700">
              "Café Fausse was born from a belief that food is more than sustenance—it&apos;s an art form, a language of its own. We strive to create moments that linger in memory long after the last bite has been enjoyed."
            </blockquote>
          </aside>

        </div>
      </section>

      {/* Founders Section */}
      <section className="about-founders py-16 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-stone-800">Our Founders</h2>

          {/* Split layout: Chef Antonio + Maria */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 my-12">
            <FounderBio name="Antonio Rossi" title="Executive Chef &amp; Co-Founder">
              <div className="">
                <p className="mb-4">Chef Antonio brings over two decades of culinary excellence to Café Fausse. His journey began in the family kitchens of Naples, where he learned traditional techniques from his grandmother Rosa.</p>

                <ul className="space-y-2 mb-4 text-stone-700 list-disc pl-8" aria-label="Chef Antonio's credentials">
                  <li>Culinarily Trained at Le Cordon Bleu, Paris</li>
                  <li>Sous Chef positions across Italy and France</li>
                  <li>Featured in Michelin Guide for culinary innovation</li>
                </ul>

                <p className="italic text-stone-600 leading-relaxed">
                  "Every ingredient tells a story. My role is to listen, preserve the essence of that story while adding my own chapter."
                </p>
              </div>
            </FounderBio>

            <FounderBio name="Maria Lopez" title="Restaurateur & Co-Founder">
              <div className="">
                <p className="mb-4">Maria's vision and hospitality expertise form the heart of Café Fausse. With background in international hospitality management and over fifteen years running award-winning establishments across Europe.</p>

                <ul className="space-y-2 mb-4 text-stone-700 list-disc pl-8" aria-label="Maria Lopez credentials">
                  <li>Hospitality degree from Cornell University School of Hotel Administration</li>
                  <li>Built and managed boutique hotels in Tuscany, Italy</li>
                  <li>Pioneer of farm-to-table movement in DC dining scene</li>
                </ul>

                <p className="italic text-stone-600 leading-relaxed">
                  "Dining is a shared human experience. We're honored to be part of life's most special moments, from anniversary dinners first meetings with friends or family celebrating."
                </p>
              </div>
            </FounderBio>
          </div> {/* End of grid */}

          <section className="mt-16 pt-8 border-t border-stone-200 text-center">
            <h3 id="legacy-heading" className="text-xl font-semibold mb-4 text-stone-800">Together</h3>
            <p className="max-w-2xl mx-auto leading-relaxed text-lg text-stone-700">
              Together, Chef Antonio and Maria have created more than a restaurant—they&apos;ve cultivated a community where exceptional food, warm hospitality, and unforgettable ambiance come together to create something truly special. Their partnership continues to thrive as they remain dedicated to pushing culinary boundaries while honoring the timeless traditions that make Café Fausse beloved by generations of diners.
            </p>
          </section>

        </div>
      </section>

    </div>
  )
}
