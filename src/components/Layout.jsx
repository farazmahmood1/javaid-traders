import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartPanel from './CartPanel'
import { chatLink } from '../lib/whatsapp'
import { IconWhatsApp } from './Icons'

/** Routers keep scroll position between pages; a catalogue should not. */
function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname, search])
  return null
}

export function Breadcrumbs({ trail = [] }) {
  return (
    <div className="breadcrumb-bar py-3">
      <div className="container-fluid">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb small">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {trail.map((item, i) =>
              i === trail.length - 1 || !item.to ? (
                <li className="breadcrumb-item active break-word" aria-current="page" key={item.label}>
                  {item.label}
                </li>
              ) : (
                <li className="breadcrumb-item" key={item.label}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              )
            )}
          </ol>
        </nav>
      </div>
    </div>
  )
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartPanel />
      <a
        href={chatLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat with us on WhatsApp"
      >
        <IconWhatsApp size={28} />
      </a>
    </>
  )
}
