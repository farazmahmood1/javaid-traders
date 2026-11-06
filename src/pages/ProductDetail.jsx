import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categoryNames, getProduct, relatedProducts } from '../lib/catalog'
import { discountPercent, img, isUrdu, money, niceTitle, priceLabel, stripHtml } from '../lib/format'
import { SITE } from '../lib/site'
import { chatLink, productInquiry } from '../lib/whatsapp'
import usePageMeta from '../lib/usePageMeta'

import { Breadcrumbs } from '../components/Layout'
import ProductCarousel from '../components/ProductCarousel'
import QtyStepper from '../components/QtyStepper'
import { IconBox, IconCheck, IconPhone, IconShield, IconTruck, IconWhatsApp } from '../components/Icons'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)

  const [active, setActive] = useState(0)
  const [qty, setQty] = useState(1)

  // A different product may mount into the same component — reset local UI state.
  useEffect(() => {
    setActive(0)
    setQty(1)
  }, [slug])

  const cats = useMemo(() => (product ? categoryNames(product) : []), [product])
  const related = useMemo(() => (product ? relatedProducts(product, 12) : []), [product])

  usePageMeta(
    product ? niceTitle(product.title) : 'Product not found',
    product
      ? stripHtml(product.desc || '').slice(0, 155) ||
          `${niceTitle(product.title)} — available at ${SITE.name}, ${SITE.address}. ${priceLabel(product)}.`
      : undefined
  )

  if (!product) return <NotFound />

  const off = discountPercent(product)
  const descIsUrdu = isUrdu(stripHtml(product.desc || ''))

  return (
    <>
      <Breadcrumbs
        trail={[
          { label: 'Categories', to: '/categories' },
          ...(cats[0] ? [{ label: cats[0].name, to: `/category/${cats[0].slug}` }] : []),
          { label: niceTitle(product.title) },
        ]}
      />

      <section className="py-4 py-lg-5">
        <div className="container-fluid">
          <div className="row g-4 g-lg-5">
            {/* ---------- Gallery ---------- */}
            <div className="col-lg-6">
              <div className="product-gallery">
                <div className="main-image position-relative">
                  {off > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-0 m-3">
                      -{off}%
                    </span>
                  )}
                  <img
                    src={img(product.images[active], 900)}
                    alt={niceTitle(product.title)}
                    width="900"
                    height="900"
                  />
                </div>

                {product.images.length > 1 && (
                  <div className="thumbs">
                    {product.images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        className={i === active ? 'is-active' : ''}
                        onClick={() => setActive(i)}
                        aria-label={`View image ${i + 1} of ${product.images.length}`}
                      >
                        <img src={img(src, 180)} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ---------- Summary ---------- */}
            <div className="col-lg-6">
              {cats.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {cats.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/category/${c.slug}`}
                      className="badge bg-accent-subtle text-accent fw-semibold py-2 px-3"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="h2 mb-3 break-word">{niceTitle(product.title)}</h1>

              <div className="d-flex align-items-baseline flex-wrap gap-2 mb-2">
                <span className="fs-3 fw-bold text-dark">{priceLabel(product)}</span>
                {off > 0 && (
                  <>
                    <span className="text-muted text-decoration-line-through">
                      {money(product.compareAt)}
                    </span>
                    <span className="badge bg-danger">Save {off}%</span>
                  </>
                )}
              </div>

              <p className="small text-muted mb-4">
                {product.soldOut ? (
                  <span className="text-danger fw-semibold">Currently out of stock</span>
                ) : (
                  <span className="text-success fw-semibold d-inline-flex align-items-center gap-1">
                    <IconCheck size={16} /> In stock — bulk quantities available
                  </span>
                )}
              </p>

              <div className="mb-4">
                <h2 className="h5 mb-2">Product description</h2>
                {product.desc ? (
                  <div
                    className={`product-desc ${descIsUrdu ? 'urdu' : ''}`}
                    dangerouslySetInnerHTML={{ __html: product.desc }}
                  />
                ) : (
                  <>
                    <p className="text-muted">
                      A detailed description for this item is not published yet. Message us on
                      WhatsApp for full specifications — material, neck size, cap type and available
                      colours.
                    </p>
                    <a
                      href={productInquiry(product, qty)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp rounded-3 d-inline-flex align-items-center gap-2"
                    >
                      <IconWhatsApp size={18} />
                      Ask about this product
                    </a>
                  </>
                )}
              </div>

              {/* Options are informational: the exact variant is settled on WhatsApp. */}
              {product.options?.length > 0 && (
                <div className="mb-4">
                  {product.options.map((o) => (
                    <div className="mb-2" key={o.name}>
                      <span className="small text-muted d-block mb-1">{o.name}</span>
                      <div className="d-flex flex-wrap gap-2">
                        {o.values.map((v) => (
                          <span key={v} className="badge bg-light text-dark fw-normal py-2 px-3">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <p className="small text-muted mb-0">
                    Confirm the exact size / colour with us on WhatsApp.
                  </p>
                </div>
              )}

              <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                <QtyStepper value={qty} onChange={setQty} size="lg" />
                <a
                  href={productInquiry(product, qty)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg rounded-3 d-inline-flex align-items-center gap-2 flex-grow-1 justify-content-center"
                >
                  <IconWhatsApp size={22} />
                  Order on WhatsApp
                </a>
              </div>

              <a
                href={`tel:${SITE.phones[0].replace(/-/g, '')}`}
                className="btn btn-outline-light btn-lg w-100 rounded-3 d-inline-flex align-items-center justify-content-center gap-2 mb-4"
              >
                <IconPhone size={20} />
                Call {SITE.phones[0]}
              </a>

              <div className="alert bg-light border-0 rounded-4 small mb-4">
                <strong className="d-block mb-1">How ordering works</strong>
                There is no online checkout. Tap <em>Order on WhatsApp</em> and we confirm the rate,
                stock and delivery for your quantity directly.
                <span className="urdu d-block mt-2">
                  آن لائن چیک آؤٹ نہیں ہے۔ واٹس ایپ پر رابطہ کریں، ہم ریٹ، اسٹاک اور ڈلیوری کنفرم کر
                  دیں گے۔
                </span>
              </div>

              <div className="row g-3">
                {[
                  [IconShield, 'Trusted quality', 'Consistent, tested packaging material'],
                  [IconBox, 'Bulk supply', 'Wholesale quantities on request'],
                  [IconTruck, 'Nationwide dispatch', 'Delivery arranged across Pakistan'],
                ].map(([Icon, t, s]) => (
                  <div className="col-md-4" key={t}>
                    <div className="d-flex gap-2 align-items-start">
                      <span className="text-accent flex-shrink-0">
                        <Icon size={22} />
                      </span>
                      <span className="small">
                        <strong className="d-block text-dark">{t}</strong>
                        <span className="text-muted">{s}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-5 pt-4 border-top g-4">
            <div className="col-lg-8">
              <h2 className="h4 mb-3">At a glance</h2>
              <table className="spec-table w-100">
                <tbody>
                  <tr>
                    <th>Product</th>
                    <td className="break-word">{niceTitle(product.title)}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>{priceLabel(product)}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{cats.map((c) => c.name).join(', ') || '—'}</td>
                  </tr>
                  {product.options?.map((o) => (
                    <tr key={o.name}>
                      <th>{o.name}</th>
                      <td>{o.values.join(', ')}</td>
                    </tr>
                  ))}
                  <tr>
                    <th>Availability</th>
                    <td>{product.soldOut ? 'Out of stock' : 'In stock'}</td>
                  </tr>
                  <tr>
                    <th>Supplier</th>
                    <td>
                      {SITE.name}, {SITE.address}
                    </td>
                  </tr>
                </tbody>
              </table>

              <a
                href={chatLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light w-100 rounded-3 mt-3 d-inline-flex align-items-center justify-content-center gap-2"
              >
                <IconWhatsApp size={18} />
                Ask a question
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductCarousel
        sub="You may also like"
        title="Related products"
        products={related}
        viewAll={cats[0] ? `/category/${cats[0].slug}` : '/shop'}
      />
    </>
  )
}
