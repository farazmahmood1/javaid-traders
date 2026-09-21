import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { img, money, niceTitle } from '../lib/format'
import { cartInquiry } from '../lib/whatsapp'
import { IconClose, IconTrash, IconWhatsApp } from './Icons'
import QtyStepper from './QtyStepper'

/** Slide-out cart. There is no checkout — the list converts into a WhatsApp message. */
export default function CartPanel() {
  const { items, total, count, isOpen, closeCart, setQty, remove, clear } = useCart()

  // Lock the page behind the panel and allow Esc to dismiss it.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ background: 'rgba(0,0,0,.45)', zIndex: 1050 }}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className="position-fixed top-0 end-0 h-100 bg-white d-flex flex-column shadow-lg"
        style={{ width: 'min(420px, 100%)', zIndex: 1055 }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <h5 className="mb-0">
            My Cart <span className="text-muted fw-normal fs-6">({count})</span>
          </h5>
          <button type="button" className="icon-btn" onClick={closeCart} aria-label="Close cart">
            <IconClose />
          </button>
        </div>

        <div className="flex-grow-1 overflow-auto px-3">
          {items.length === 0 ? (
            <div className="empty-state">
              <p className="mb-3">Your cart is empty.</p>
              <Link to="/shop" className="btn btn-primary rounded-3" onClick={closeCart}>
                Browse products
              </Link>
            </div>
          ) : (
            items.map((it) => (
              <div className="cart-line" key={it.id}>
                <Link to={`/product/${it.slug}`} className="thumb" onClick={closeCart}>
                  <img src={img(it.image, 160)} alt="" loading="lazy" />
                </Link>
                <div className="flex-grow-1 min-w-0">
                  <h6 className="break-word">
                    <Link to={`/product/${it.slug}`} className="link-plain" onClick={closeCart}>
                      {niceTitle(it.title)}
                    </Link>
                  </h6>
                  <div className="small text-muted mb-2">{money(it.price)} each</div>
                  <div className="d-flex align-items-center justify-content-between gap-2">
                    <QtyStepper value={it.qty} onChange={(q) => setQty(it.id, q)} />
                    <div className="d-flex align-items-center gap-2">
                      <strong className="small">{money(it.qty * it.price)}</strong>
                      <button
                        type="button"
                        className="btn btn-sm btn-link text-danger p-1"
                        onClick={() => remove(it.id)}
                        aria-label={`Remove ${it.title}`}
                      >
                        <IconTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-top p-3">
            <div className="d-flex justify-content-between mb-1">
              <span className="text-muted">Estimated total</span>
              <strong className="fs-5">{money(total)}</strong>
            </div>
            <p className="small text-muted mb-3">
              Prices are indicative. Final rate and availability are confirmed on WhatsApp.
            </p>
            <a
              href={cartInquiry(items, total)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 mb-2"
            >
              <IconWhatsApp size={20} />
              Send order on WhatsApp
            </a>
            <div className="d-flex gap-2">
              <Link to="/cart" className="btn btn-outline-light flex-grow-1 rounded-3" onClick={closeCart}>
                View cart
              </Link>
              <button type="button" className="btn btn-outline-light rounded-3" onClick={clear}>
                Clear
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
