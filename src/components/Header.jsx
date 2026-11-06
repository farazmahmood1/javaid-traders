import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { CATEGORIES } from '../lib/catalog'
import { SITE } from '../lib/site'
import { chatLink } from '../lib/whatsapp'
import { useCart } from '../context/CartContext'
import { IconCart, IconMenu, IconPhone, IconSearch, IconWhatsApp, IconClose } from './Icons'

export default function Header() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { count, openCart } = useCart()
  const [term, setTerm] = useState(params.get('q') || '')
  const [navOpen, setNavOpen] = useState(false)
  const [catsOpen, setCatsOpen] = useState(false)
  const catsRef = useRef(null)

  // Keep the box in step with the URL when the user lands on /shop?q=...
  useEffect(() => {
    setTerm(params.get('q') || '')
  }, [params])

  // Close the departments dropdown on an outside click.
  useEffect(() => {
    if (!catsOpen) return
    const onDown = (e) => {
      if (catsRef.current && !catsRef.current.contains(e.target)) setCatsOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [catsOpen])

  const submit = (e) => {
    e.preventDefault()
    const q = term.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setNavOpen(false)
  }

  const searchBox = (
    <form className="search-bar d-flex align-items-center p-2 rounded-4" onSubmit={submit} role="search">
      <input
        type="search"
        className="form-control border-0 bg-transparent"
        placeholder="Search bottles, jars, tubes…"
        aria-label="Search products"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-sm btn-primary rounded-3 px-3" aria-label="Search">
        <IconSearch size={18} />
      </button>
    </form>
  )

  return (
    <header className="site-header">
      <div className="container-fluid">
        <div className="row py-3 align-items-center g-3">
          <div className="col-6 col-lg-3">
            <div className="main-logo">
              <Link to="/" className="d-inline-flex align-items-center gap-2">
                <img src="/images/logo.png" alt={SITE.name} />
                <span className="lh-1">
                  <span className="d-block fw-bold fs-6 fs-sm-5 text-dark">{SITE.name}</span>
                  <small className="text-muted d-none d-sm-block">{SITE.tagline}</small>
                </span>
              </Link>
            </div>
          </div>

          <div className="col-lg-5 d-none d-lg-block">{searchBox}</div>

          <div className="col-6 col-lg-4 d-flex justify-content-end align-items-center gap-2 gap-sm-3">
            <a
              href={`tel:${SITE.phones[0].replace(/-/g, '')}`}
              className="text-end d-none d-xl-block link-plain"
            >
              <span className="d-block small text-muted lh-1">Call us</span>
              <strong className="text-dark">{SITE.phones[0]}</strong>
            </a>

            <a
              href={chatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp d-none d-md-inline-flex align-items-center gap-2 rounded-3"
            >
              <IconWhatsApp size={18} />
              <span className="d-none d-lg-inline">WhatsApp</span>
            </a>

            <button type="button" className="icon-btn" onClick={openCart} aria-label={`Cart, ${count} items`}>
              <IconCart />
              {count > 0 && <span className="badge-count">{count > 99 ? '99+' : count}</span>}
            </button>

            <button
              type="button"
              className="icon-btn d-lg-none"
              onClick={() => setNavOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={navOpen}
            >
              {navOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>

      <div className="border-top d-none d-lg-block">
        <div className="container-fluid">
          <nav className="main-menu d-flex align-items-center gap-2 py-2">
            <div className="position-relative" ref={catsRef}>
              <button
                type="button"
                className="btn btn-primary rounded-3 d-flex align-items-center gap-2"
                onClick={() => setCatsOpen((v) => !v)}
                aria-expanded={catsOpen}
              >
                <IconMenu size={18} />
                Shop by Department
              </button>
              {catsOpen && (
                <ul
                  className="list-unstyled position-absolute bg-white shadow rounded-3 p-2 mt-1"
                  style={{ minWidth: 260, zIndex: 1050 }}
                >
                  {CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/category/${c.slug}`}
                        className="d-flex justify-content-between align-items-center px-3 py-2 rounded-2 link-plain"
                        onClick={() => setCatsOpen(false)}
                      >
                        <span>{c.name}</span>
                        <small className="text-muted">{c.count}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ul className="navbar-nav flex-row list-unstyled mb-0 ms-2">
              {[
                ['/', 'Home'],
                ['/shop', 'All Products'],
                ['/categories', 'Categories'],
                ['/about', 'About'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li className="nav-item" key={to}>
                  <NavLink to={to} end={to === '/'} className="nav-link">
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <span className="ms-auto d-flex align-items-center gap-2 small text-muted">
              <IconPhone size={16} />
              {SITE.phones.join(' · ')}
            </span>
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      {navOpen && (
        <div className="d-lg-none border-top bg-white px-3 py-3">
          <div className="mb-3">{searchBox}</div>
          <ul className="list-unstyled mb-3">
            {[
              ['/', 'Home'],
              ['/shop', 'All Products'],
              ['/categories', 'Categories'],
              ['/cart', 'My Cart'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className="d-block py-2 fw-semibold link-plain"
                  onClick={() => setNavOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="border-top pt-3">
            <p className="small text-muted mb-2">Departments</p>
            <div className="d-flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  className="badge bg-light text-dark fw-normal py-2 px-3"
                  onClick={() => setNavOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
