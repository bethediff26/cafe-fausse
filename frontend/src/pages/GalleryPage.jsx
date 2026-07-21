import React, { useState, useEffect } from 'react';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Keyboard accessibility: Close lightbox on Escape key press (FR-13)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImage !== null) {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup: Remove event listener on unmount or when selectedImage changes
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const galleryImages = [
    // Ambiance - The interior ambiance of the restaurant
    { id: 1, category: "Ambiance", src: "/images/gallery-cafe-interior.webp", alt: "The interior ambiance of Café Fausse" },
    // Menu Dishes - Dishes from the menu
    { id: 4, category: "Menu Dishes", src: "/images/gallery-ribeye-steak.webp", alt: "Signature Ribeye Steak dish" },
    // Behind the Scenes - Special events and behind-the-scenes images
    { id: 7, category: "Behind the Scenes", src: "/images/gallery-special-event.webp", alt: "Special event setup in dining area" }
  ];


  const categories = ["Ambiance", "Menu Dishes", "Behind the Scenes"];


  return (
    <div className="gallery-page min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-stone-900 mb-4">Our Gallery</h1>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] gap-8 justify-center mb-16">
          {categories.map((cat) => (
            <div key={cat} className="gallery-page__category-section">
              <h2 className="text-2xl font-serif text-stone-900 border-b-2 border-orange-500 pb-2 mb-6 inline-block">{cat}</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] gap-8 justify-center max-w-5xl mx-auto">
                {galleryImages.filter(img => img.category === cat).map((img) => (
                  <div
                    key={img.id}
                    className="gallery-page__image-card cursor-pointer overflow-hidden rounded-lg shadow-md border border-stone-200 bg-white group transition-all hover:shadow-xl max-w-[300px] w-full mx-auto"
                    style={{ maxWidth: '320px', width: '100%', margin: '0 auto' }}
                    onClick={() => setSelectedImage(img)}
                  >
                    <div className="aspect-video w-full overflow-hidden bg-stone-200">
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{ height: '200px', objectFit: 'cover' }}
                        className="w-full h-48 min-h-[12rem] max-h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/600x400/292524/f97316?text=${encodeURIComponent(img.alt + ' - Placeholder')}`;
                        }}
                      />
                    </div>
                    <div className="p-3 bg-stone-50 border-t border-stone-100">
                      <p className="text-sm text-stone-600 italic font-medium">{img.alt}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          ))}
        </div>

        {/* Awards Section */}
        <section className="mb-16" aria-labelledby="awards-heading">
          <h2 id="awards-heading" className="text-3xl font-serif text-center text-stone-900 mb-8">Awards &amp; Recognition</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <article className="text-center p-6 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-lg font-semibold text-stone-900 mb-1">Best Italian Restaurant</p>
              <p className="text-sm text-stone-600">2023 - DC Food &amp; Wine Magazine</p>
            </article>
            <article className="text-center p-6 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-lg font-semibold text-stone-900 mb-1">Michelin Guide Selection</p>
              <p className="text-sm text-stone-600">2022-2024</p>
            </article>
            <article className="text-center p-6 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-lg font-semibold text-stone-900 mb-1">Excellence in Dining Award</p>
              <p className="text-sm text-stone-600">2021 - Culinary Times</p>
            </article>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section className="mb-16" aria-labelledby="reviews-heading">
          <h2 id="reviews-heading" className="text-3xl font-serif text-center text-stone-900 mb-8">Customer Reviews</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <article className="p-6 rounded-lg bg-white border border-stone-200 shadow-sm">
              <blockquote className="text-lg italic text-stone-700 leading-relaxed mb-4">
                &ldquo;An incredible dining experience! The food and ambiance were top-notch.&rdquo;
              </blockquote>
              <p className="text-right font-semibold text-stone-900">&mdash; Jane D.</p>
            </article>
            <article className="p-6 rounded-lg bg-white border border-stone-200 shadow-sm">
              <blockquote className="text-lg italic text-stone-700 leading-relaxed mb-4">
                &ldquo;The Ribeye Steak was cooked to perfection. Highly recommended!&rdquo;
              </blockquote>
              <p className="text-right font-semibold text-stone-900">&mdash; Mark S.</p>
            </article>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[99999] flex items-center justify-center p-4 cursor-zoom-out"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 99999, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div className="relative max-w-3xl w-full flex flex-col items-center justify-center pointer-events-auto bg-stone-950 p-6 rounded-2xl shadow-2xl border border-stone-800 relative" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 text-white bg-stone-800 hover:bg-stone-700 w-9 h-9 flex items-center justify-center rounded-full shadow-xl border border-stone-700 transition-all z-[100005] cursor-pointer"
                aria-label="Close modal"
              >
                <span className="text-xl font-sans font-bold leading-none select-none">×</span>
              </button>

              {selectedImage && (<>
                <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full max-h-[70vh] object-contain rounded-lg" />
                <div className="mt-4 text-center text-white">
                  <p className="font-serif">{selectedImage.alt}</p>
                </div>
              </>) }
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GalleryPage;