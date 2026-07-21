import React from 'react';

/**
 * ChefPortrait component displays a portrait image with alt text.
 */
function ChefPortrait({ src, alt }) {
  return (
    <figure className="w-full h-auto rounded-lg shadow-xl">
      <img
        src={src || '/placeholder-chef.jpg'}
        alt={alt}
        loading="lazy"
        className="w-full h-auto object-cover rounded-md"
      />
    </figure>
  );
}

export default ChefPortrait;
