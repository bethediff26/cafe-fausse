import React from 'react';
import ChefPortrait from './ChefPortrait';

/**
 * FounderBio component displays a founder's biography with image and details.
 */
function FounderBio({ name, title, children }) {
  return (
    <figure className="rounded-lg shadow-xl">
      {/* Portrait placeholder area */}
	  {/*<ChefPortrait src="/placeholder-chef.jpg" alt={`Portrait of ${name}`} /> */}

      {/* Name and title */}
      <figcaption>
        {title && (
          <p className="font-bold text-lg leading-snug text-stone-900">{title}</p>
        )}
        <h3 className="text-xl font-semibold mt-1">{name}</h3>

        {/* Content passed as children */}
        {children && (
          <div className="mt-4 space-y-2 text-stone-700 leading-relaxed">
            {React.Children.map(children, child =>
              typeof child === 'string' ? <p>{child}</p> : child
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default FounderBio;
