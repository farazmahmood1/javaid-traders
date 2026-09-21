import { Link } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../lib/catalog'
import { SITE } from '../lib/site'
import { chatLink } from '../lib/whatsapp'
import usePageMeta from '../lib/usePageMeta'
import { Breadcrumbs } from '../components/Layout'
import CategoryCard from '../components/CategoryCard'
import { IconBox, IconShield, IconTag, IconTruck, IconWhatsApp } from '../components/Icons'

export default function About() {
  usePageMeta(
    'About Us',
    `${SITE.name} (${SITE.tagline}) — ${SITE.slogan}. Pharmaceutical, cosmetic and food packaging supplier at ${SITE.address}.`
  )

  return (
    <>
      <Breadcrumbs trail={[{ label: 'About Us' }]} />

      <section className="py-4 py-lg-5">
        <div className="container-fluid">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <span className="sub text-accent fw-bold text-uppercase small">About us</span>
              <h1 className="h2 mt-2 mb-3">
                {SITE.name} — {SITE.slogan}
              </h1>
              <p>
                {SITE.name}, also known as {SITE.tagline}, supplies high quality bottles, jars,
                capsules and cosmetic packaging from {SITE.address}. Pharmaceutical, cosmetic and
                food packing items are available under one roof — in retail and in bulk.
              </p>
              <p>
                Our range covers air-tight pharma jars for capsules, tablets and powders; acrylic
                and PP cream jars; glass and PET serum bottles; oil and shampoo bottles with pumps,
                flip-tops and sprays; empty cosmetic tubes; airless bottles; food and honey jars;
                packing pouches; and filling and packing machinery.
              </p>
              <p className="urdu">
                جے ڈی ٹریڈر (جواد بوتل اسٹور) — اعتماد کا نام۔ ہم شاہ عالم مارکیٹ، لاہور سے اعلیٰ
                کوالٹی کی بوتلیں، جار، کیپسول اور کاسمیٹک پیکجنگ فراہم کرتے ہیں۔ فارماسیوٹیکل،
                کاسمیٹک اور فوڈ پیکنگ کا سامان ایک ہی چھت کے نیچے — ریٹیل اور بلک، دونوں میں
                دستیاب۔
              </p>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link to="/shop" className="btn btn-primary rounded-3 px-4">
                  Browse {PRODUCTS.length}+ products
                </Link>
                <a
                  href={chatLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp rounded-3 px-4 d-inline-flex align-items-center gap-2"
                >
                  <IconWhatsApp size={18} />
                  Talk to us
                </a>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                {[
                  [IconShield, `${PRODUCTS.length}+`, 'Products in catalogue'],
                  [IconBox, `${CATEGORIES.length}`, 'Departments'],
                  [IconTag, 'Bulk', 'Wholesale rates'],
                  [IconTruck, 'Pakistan', 'Nationwide dispatch'],
                ].map(([Icon, big, small]) => (
                  <div className="col-6" key={small}>
                    <div className="feature-card text-center">
                      <div className="icon mx-auto">
                        <Icon />
                      </div>
                      <div className="h4 mb-0">{big}</div>
                      <p className="small text-muted mb-0">{small}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-accent-subtle">
        <div className="container-fluid">
          <div className="section-title text-center">
            <h2>What we supply</h2>
          </div>
          <div className="row g-3 g-lg-4">
            {CATEGORIES.map((c) => (
              <div className="col-6 col-md-4 col-lg-3" key={c.slug}>
                <CategoryCard category={c} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
