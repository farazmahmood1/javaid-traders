import { useState } from 'react'
import { SITE } from '../lib/site'
import usePageMeta from '../lib/usePageMeta'
import { Breadcrumbs } from '../components/Layout'
import { IconMail, IconPhone, IconPin, IconWhatsApp } from '../components/Icons'

/**
 * There is no backend, so the "form" composes a WhatsApp message instead of
 * POSTing anywhere — the same conversion path as the rest of the site.
 */
export default function Contact() {
  usePageMeta(
    'Contact',
    `Contact ${SITE.name} — ${SITE.address}. Phone ${SITE.phones.join(', ')}, email ${SITE.email}.`
  )

  const [form, setForm] = useState({ name: '', city: '', message: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const href = () => {
    const lines = [
      `السلام علیکم ${SITE.name}!`,
      '',
      form.name && `نام: ${form.name}`,
      form.city && `شہر: ${form.city}`,
      form.message && '',
      form.message || 'مجھے آپ کے پروڈکٹس کے بارے میں معلومات چاہیے۔',
    ].filter((l) => l !== false && l !== undefined)
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
  }

  return (
    <>
      <Breadcrumbs trail={[{ label: 'Contact' }]} />

      <section className="py-4 py-lg-5">
        <div className="container-fluid">
          <div className="row g-4 g-lg-5">
            <div className="col-lg-5">
              <h1 className="h2 mb-3">Get in touch</h1>
              <p className="text-muted">
                Tell us the sizes and quantities you need. We reply with rate, stock and delivery —
                usually the same day.
              </p>
              <p className="urdu text-muted">
                ہمیں سائز اور تعداد بتائیں۔ ہم ریٹ، اسٹاک اور ڈلیوری کی تفصیل اسی دن بھیج دیتے ہیں۔
              </p>

              <ul className="list-unstyled mt-4">
                <li className="d-flex gap-3 mb-4">
                  <span className="feature-card d-flex align-items-center justify-content-center p-0 flex-shrink-0" style={{ width: 48, height: 48 }}>
                    <span className="text-accent">
                      <IconPin size={20} />
                    </span>
                  </span>
                  <span>
                    <strong className="d-block text-dark">Address</strong>
                    {SITE.address}
                    <span className="urdu d-block">{SITE.addressUr}</span>
                  </span>
                </li>
                <li className="d-flex gap-3 mb-4">
                  <span className="feature-card d-flex align-items-center justify-content-center p-0 flex-shrink-0" style={{ width: 48, height: 48 }}>
                    <span className="text-accent">
                      <IconPhone size={20} />
                    </span>
                  </span>
                  <span>
                    <strong className="d-block text-dark">Phone</strong>
                    {SITE.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/-/g, '')}`} className="d-block link-plain">
                        {p}
                      </a>
                    ))}
                  </span>
                </li>
                <li className="d-flex gap-3 mb-4">
                  <span className="feature-card d-flex align-items-center justify-content-center p-0 flex-shrink-0" style={{ width: 48, height: 48 }}>
                    <span className="text-accent">
                      <IconMail size={20} />
                    </span>
                  </span>
                  <span>
                    <strong className="d-block text-dark">Email</strong>
                    <a href={`mailto:${SITE.email}`} className="link-plain">
                      {SITE.email}
                    </a>
                  </span>
                </li>
              </ul>

              <p className="small text-muted mb-0">
                <strong className="text-dark">Business hours:</strong> {SITE.hours}
              </p>
            </div>

            <div className="col-lg-7">
              <div className="filter-box">
                <h2 className="h5 mb-1">Send an enquiry</h2>
                <p className="small text-muted">
                  This opens WhatsApp with your message ready to send.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    window.open(href(), '_blank', 'noopener,noreferrer')
                  }}
                >
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small" htmlFor="c-name">
                        Your name
                      </label>
                      <input
                        id="c-name"
                        className="form-control rounded-3"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="e.g. Ali Raza"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small" htmlFor="c-city">
                        City
                      </label>
                      <input
                        id="c-city"
                        className="form-control rounded-3"
                        value={form.city}
                        onChange={set('city')}
                        placeholder="e.g. Karachi"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small" htmlFor="c-msg">
                        What do you need?
                      </label>
                      <textarea
                        id="c-msg"
                        rows="5"
                        className="form-control rounded-3"
                        value={form.message}
                        onChange={set('message')}
                        placeholder="e.g. 500 x 250cc HDPE pharma jars with aluminium cap — please share rate and delivery to Karachi."
                      />
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-whatsapp btn-lg rounded-3 d-inline-flex align-items-center gap-2"
                      >
                        <IconWhatsApp size={20} />
                        Send on WhatsApp
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="ratio ratio-16x9 rounded-4 overflow-hidden mt-4">
                <iframe
                  title="JD Trader location"
                  src="https://www.google.com/maps?q=Shah%20Alam%20Market%20Lahore&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
