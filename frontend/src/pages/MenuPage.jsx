import { useState, useEffect } from 'react'
import MenuCard from '../components/menu/MenuCard'

const API_BASE = '/api/menu'

export default function MenuPage() {
  const [menuData, setMenuData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data)
        // Set first category as active by default
        if (data.categories.length > 0) {
          setActiveCategory(data.categories[0].name)
        }
        setLoading(false)
      })
      .catch(() => setError('Failed to load menu data.'))
  }, [])

  const handleFilterClick = (categoryName) => {
    setActiveCategory(categoryName)
  }

  if (loading) {
    return <p className="menu-page__loading">Loading menu...</p>
  }

  if (error) {
    return <section className="page page--menu">{error}</section>
  }

  // Filter items for the active category
  const currentCategory = menuData.categories.find(
    (cat) => cat.name === activeCategory,
  ) || {}

  return (
    <div className="page page--menu">
      {/* Category filter tabs */}
      <ul role="tablist" aria-label="Menu categories" className="category-tabs list-none p-0 flex gap-x-6 mt-12 mb-8 border-b">
        {menuData.categories.map((cat) => (
          <li key={cat.name}>
            <button
              type="button"
              onClick={() => handleFilterClick(cat.name)}
              className={`category-tab p-3 font-bold transition-colors duration-200 ease-in-out border-b-4 focus:outline-none ${
                activeCategory === cat.name ? 'border-blue-600 text-black' : 'border-transparent hover:border-gray-500 cursor-pointer'
              }`}
              role="tab"
              aria-selected={activeCategory === cat.name}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Menu items grid */}
      <section className={`menu-category menu-section ${currentCategory ? '' : 'hidden'}`} aria-labelledby={`${activeCategory}-heading`}>
        <header>
          <h2 id={`${activeCategory}-heading`} className="category-heading text-3xl font-bold">
            {activeCategory}
          </h2>
        </header>

        {currentCategory.items.length === 0 ? (
          <p>No items available in this category.</p>
        ) : (
          currentCategory.items.map((item) => <MenuCard key={item.name} item={item} />)
        )}      </section>

      {/* Fallback if no items for active category */}
      {currentCategory && currentCategory.items.length === 0 ? (
        <p className="menu-category__empty">No menu items available.</p>
      ) : null}
    </div>
  )
}
