import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { img, money, niceTitle } from '../lib/format'
import { cartInquiry } from '../lib/whatsapp'
import { SITE } from '../lib/site'
import usePageMeta from '../lib/usePageMeta'
import { Breadcrumbs } from '../components/Layout'
import QtyStepper from '../components/QtyStepper'
import { IconPhone, IconTrash, IconWhatsApp } from '../components/Icons'

export default function Cart() {
  const { items, total, count, setQty, remove, clear } = useCart()
  usePageMeta('My Cart', 'Review your selected products and send the list to JD Trader on WhatsApp.')

  return (
    <>
      <Breadcrumbs trail={[{ label: 'My Cart' }]} />

      <section className="py-4 py-lg-5">
        <div className="container-fluid">
          <h1 className="h3 mb-1">My Cart</h1>
          <p className="text-muted">
            {count === 0
              ? 'Nothing here yet.'
              : `${count} item${count === 1 ? '' : 's'} ready to send as an order enquiry.`}
          </p>

          {items.length === 0 ? (
            <div className="empty-state">
              <h2 className="h5 mb-2">Your cart is empty</h2>
              <p className="mb-3">Add the bottles and jars you need, then send the list on WhatsApp.</p>
              <Link to="/shop" className="btn btn-primary rounded-3 px-4">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="row g-4 mt-1">
              <div className="col-lg-8">
                <div className="filter-box">
                  <div className="d-none d-md-flex small text-muted fw-semibold pb-2 border-bottom">
                    <span className="flex-grow-1">Product</span>
                    <span style={{ width: 130 }}>Quantity</span>
                    <span style={{ width: 120 }} className="text-end">
                      Subtotal
                    </span>
                    <span style={{ width: 40 }} />
                  </div>

                  {items.map((it) => (
                    <div
                      className="d-flex flex-wrap flex-md-nowrap align-items-center gap-3 py-3 border-bottom"
                      key={it.id}
                    >
                      <Link to={`/product/${it.slug}`} className="thumb cart-line-thumb">
                        <span
                          className="d-flex align-items-center justify-content-center rounded-3 overflow-hidden"
                          style={{ width: 72, height: 72, background: '#f9f9f9' }}
                        >
                          <img
                            src={img(it.image, 160)}
                            alt=""
                            loading="lazy"
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                          />
                        </span>
                      </Link>

                      <div className="flex-grow-1 min-w-0">
                        <Link to={`/product/${it.slug}`} className="link-plain fw-semibold break-word">
                          {niceTitle(it.title)}
                        </Link>
                        <div className="small text-muted">{money(it.price)} each</div>
                      </div>

                      <div style={{ width: 130 }}>
                        <QtyStepper value={it.qty} onChange={(q) => setQty(it.id, q)} />
                      </div>

                      <div style={{ width: 120 }} className="text-md-end fw-bold">
                        {money(it.qty * it.price)}
                      </div>

                      <button
                        type="button"
                        className="btn btn-sm btn-link text-danger"
                        style={{ width: 40 }}
                        onClick={() => remove(it.id)}
                        aria-label={`Remove ${it.title}`}
                      >
                        <IconTrash />
                      </button>
                    </div>
                  ))}

                  <div className="d-flex justify-content-between pt-3">
                    <Link to="/shop" className="btn btn-outline-light rounded-3">
                      Continue shopping
                    </Link>
                    <button type="button" className="btn btn-outline-light rounded-3" onClick={clear}>
                      Clear cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="filter-box position-sticky" style={{ top: 100 }}>
                  <h5>Order summary</h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Items</span>
                    <span>{count}</span>
                  </div>
                  <div className="d-flex justify-content-between pb-3 mb-3 border-bottom">
                    <span className="text-muted">Estimated total</span>
                    <strong className="fs-5">{money(total)}</strong>
                  </div>

                  <p className="small text-muted">
                    This is an enquiry list, not an online order. Prices shown are indicative — the
                    final rate, stock and delivery are confirmed on WhatsApp.
                  </p>
                  <p className="urdu small text-muted">
                    یہ صرف استفسار کی فہرست ہے۔ حتمی ریٹ، اسٹاک اور ڈلیوری واٹس ایپ پر طے ہوں گے۔
                  </p>

                  <a
                    href={cartInquiry(items, total)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg w-100 rounded-3 d-flex align-items-center justify-content-center gap-2 mb-2"
                  >
                    <IconWhatsApp size={22} />
                    Send order on WhatsApp
                  </a>
                  <a
                    href={`tel:${SITE.phones[0].replace(/-/g, '')}`}
                    className="btn btn-outline-light w-100 rounded-3 d-flex align-items-center justify-content-center gap-2"
                  >
                    <IconPhone size={18} />
                    Call {SITE.phones[0]}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
