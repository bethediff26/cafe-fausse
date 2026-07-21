import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import './layout.css'

export default function Layout() {
  return (
    <div className="site-layout">
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
