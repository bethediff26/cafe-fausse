      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[99999] flex items-center justify-center p-4 cursor-zoom-out" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 99999 }} onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-3xl w-full flex flex-col items-center justify-center pointer-events-auto bg-stone-950 p-6 rounded-2xl shadow-2xl border border-stone-800 animate-fade-in transition-all transform scale-100">
            <>
              <button className="absolute -top-12 right-0 text-white text-3xl font-bold hover:text-orange-500 transition-colors shadow-lg rounded-full p-1 bg-black/50" onClick={() => setSelectedImage(null)}>×</button>

              <div className="flex flex-col items-center justify-center pointer-events-auto max-w-[70vh]" onClick={(e) => e.stopPropagation()}>
                <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-full object-contain rounded-lg" />
                <p className="text-center italic font-medium leading-relaxed mt-2">{selectedImage.alt}</p>
              </div>
            </>
          </div>
        </div>
      )}
