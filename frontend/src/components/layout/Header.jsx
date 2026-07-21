import { NavLink, Outlet } from 'react-router-dom'
import { IMAGES, RESTAURANT } from '../../data/contact'
import './layout.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
]

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="site-header__brand" end>
          <img
            src={IMAGES.homeHero}
            alt=""
            className="site-header__logo"
            width={56}
            height={56}
          />
          <span className="site-header__name">{RESTAURANT.name}</span>
        </NavLink>

        <nav className="site-header__nav" aria-label="Main navigation">
          <ul className="site-header__nav-list">
            {NAV_LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `site-header__nav-link${isActive ? ' site-header__nav-link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
