import { Link } from 'react-router-dom'
import { CATEGORIES } from '../lib/catalog'
import { SITE } from '../lib/site'
import { chatLink } from '../lib/whatsapp'
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
  IconYoutube,
} from './Icons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer pt-5">
      <div className="container-fluid">
        <div className="row g-4 pb-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/images/logo.png"
                alt={SITE.name}
                style={{ height: 52, borderRadius: 8 }}
              />
              <span className="lh-1">
                <span className="d-block fw-bold fs-5 text-white">{SITE.name}</span>
                <small>{SITE.tagline}</small>
              </span>
            </div>
            <p className="small mb-3" style={{ maxWidth: 380 }}>
              High quality bottles, jars, tubes and cosmetic packaging — cosmetic,
              skincare and food packing items under one roof. Best quality, reasonable price and
              bulk availability.
            </p>
            <p className="urdu mb-3" style={{ maxWidth: 380, fontSize: '0.95rem' }}>
              فارماسیوٹیکل، کاسمیٹک اور فوڈ پیکنگ کا سامان ایک ہی چھت کے نیچے۔ بہترین کوالٹی،
              مناسب قیمت اور بلک میں دستیابی۔
            </p>
            <div className="d-flex gap-2">
              {[
                [SITE.social.facebook, 'Facebook', IconFacebook],
                [SITE.social.instagram, 'Instagram', IconInstagram],
                [SITE.social.youtube, 'YouTube', IconYoutube],
              ].map(([href, label, Icon]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: 38, height: 38, background: 'rgba(255,255,255,.08)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="col-6 col-lg-3">
            <h5>Departments</h5>
            <ul className="list-unstyled small">
              {CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.slug} className="mb-2">
                  <Link to={`/category/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="text-accent fw-semibold">
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Company</h5>
            <ul className="list-unstyled small">
              {[
                ['/', 'Home'],
                ['/shop', 'All Products'],
                ['/about', 'About Us'],
                ['/contact', 'Contact'],
                ['/cart', 'My Cart'],
              ].map(([to, label]) => (
                <li className="mb-2" key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-3">
            <h5>Get in touch</h5>
            <ul className="list-unstyled small">
              <li className="d-flex gap-2 mb-3">
                <span className="text-accent flex-shrink-0 mt-1">
                  <IconPin size={18} />
                </span>
                <span>{SITE.address}</span>
              </li>
              <li className="d-flex gap-2 mb-3">
                <span className="text-accent flex-shrink-0 mt-1">
                  <IconPhone size={18} />
                </span>
                <span>
                  {SITE.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/-/g, '')}`} className="d-block">
                      {p}
                    </a>
                  ))}
                  <small className="d-block">{SITE.contactPerson}</small>
                </span>
              </li>
              <li className="d-flex gap-2 mb-3">
                <span className="text-accent flex-shrink-0 mt-1">
                  <IconMail size={18} />
                </span>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
            <a
              href={chatLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp d-inline-flex align-items-center gap-2 rounded-3"
            >
              <IconWhatsApp size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom py-4 d-flex flex-wrap justify-content-between gap-2 small">
          <span>
            © {year} {SITE.name}. All rights reserved.
          </span>
          <span>
            Template by{' '}
            <a href="https://templatesjungle.com/" target="_blank" rel="noopener noreferrer">
              TemplatesJungle
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
