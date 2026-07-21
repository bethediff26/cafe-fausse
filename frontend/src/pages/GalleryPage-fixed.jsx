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
    <div className="gallery-page bg-stone-100 text-stone-800 min-h-screen font-sans pb-16">
      {/* Hero Header */}
      <section className="gallery-page__hero bg-stone-900 text-stone-100 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-orange-500 mb-4">Our Story in Pictures</h1>
        <p className="text-stone-300 italic max-w-2xl mx-auto">A visual journey through our ambiance, curated dishes, and dedicated team.</p>
      </section>

      {/* Image Sections */}
      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-12">
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

