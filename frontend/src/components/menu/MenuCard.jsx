export default function MenuCard({ item }) {
  const tags = item.tags || []

  return (
    <div className="menu-card">
      {item.image && (
        <img src={item.image} alt={`Photo of ${item.name}`} loading="lazy" />
      )}
      <div>
        <h3>{item.name}</h3>
        {tags.length > 0 && tags.includes('Vegan') ? (
          <p className="description">Vegan</p>
        ) : item.description ? (
          <p className="description">{item.description}</p>
        ) : null}

        {(item.price || item.dietaryTags) && (
          <div className="menu-card__meta">
            {item.price && (
              <span className="price">${item.price.toFixed(2)}</span>
            )}

            {tags.includes('Vegan') ? (
              <span className="tag tag--vegan">Vegan</span>
            ) : tags.includes('Vegetarian') || item.dietaryTags?.includes('vegetarian') ? (
              <span className="tag tag--meat-free">Meat Free</span>
            ) : null}

            {tags.includes('GF') || item.dietaryTags?.contains('gluten free') || item.dietaryTags?.includes('Gluten-Free') ? (
              <span className="tag tag--gf">Gluten Free</span>
            ) : tags.some((t) => /glut|wheat/.test(t)) ? (
              <span className="warning-tag">Contains Wheat/Gluten</span>
            ) : null}

            {tags.includes('Spicy') || item.dietaryTags?.includes('spicy') ? (
              <span className="tag tag--spicy">⚠️ Spicy</span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
