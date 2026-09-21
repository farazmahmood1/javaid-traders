import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination as SwiperPagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {
  CATEGORIES,
  PRODUCTS,
  dealProducts,
  featuredProducts,
  newArrivals,
  queryProducts,
} from '../lib/catalog'
import { img } from '../lib/format'
import { SITE } from '../lib/site'
import { chatLink } from '../lib/whatsapp'
import usePageMeta from '../lib/usePageMeta'

import CategoryCard from '../components/CategoryCard'
import ProductCarousel from '../components/ProductCarousel'
import ProductCard from '../components/ProductCard'
import {
  IconBox,
  IconChevronLeft,
  IconChevronRight,
  IconPhone,
  IconShield,
  IconTag,
  IconTruck,
  IconWhatsApp,
} from '../components/Icons'

const HERO = [
  {
    kicker: 'Pharmaceutical Packaging',
    title: 'Jars, capsules & containers — wholesale rates',
    text: 'Air-tight pharma jars for capsules, tablets, powders and supplements. Bulk quantities available.',
    cta: '/category/pharma-jar',
    cat: 'pharma-jar',
  },
  {
    kicker: 'Cosmetic Packaging',
    title: 'Serum bottles, cream jars & airless pumps',
    text: 'Glass and PET serum bottles, acrylic cream jars and airless bottles in every size and finish.',
    cta: '/category/serum-bottel',
    cat: 'serum-bottel',
  },
  {
    kicker: 'Oil & Shampoo Bottles',
    title: 'Every size, every cap — one roof',
    text: 'PET, HDPE and glass bottles for oils, shampoos and lotions, with pumps, flip-tops and sprays.',
    cta: '/category/oil-shampoo',
    cat: 'oil-shampoo',
  },
]

const USP = [
  { Icon: IconShield, title: 'The Name of Trust', text: 'Serving Shah Alam Market, Lahore with consistent quality.' },
  { Icon: IconBox, title: 'Bulk availability', text: 'Wholesale quantities ready — pharma, cosmetic and food packing.' },
  { Icon: IconTag, title: 'Reasonable pricing', text: 'Direct trader rates without the middle-man markup.' },
  { Icon: IconTruck, title: 'Nationwide dispatch', text: 'We arrange delivery across Pakistan on confirmed orders.' },
]

/** Picks a representative product image for a hero/promo slot. */
const heroImage = (catSlug) => {
  const p = queryProducts({ category: catSlug }).find((x) => x.images.length)
  return p ? img(p.images[0], 700) : null
}

export default function Home() {
  usePageMeta(
    null,
    `${SITE.name} — ${SITE.slogan}. Pharmaceutical, cosmetic and food packaging: jars, serum bottles, shampoo bottles, tubes and filling machines. ${SITE.address}.`
  )

  const catPrev = useRef(null)
  const catNext = useRef(null)

  const featured = featuredProducts(12)
  const deals = dealProducts(12)
  const arrivals = newArrivals(12)

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        className="py-4"
        style={{
          backgroundImage: "url('/images/background-pattern.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="container-fluid">
          <div className="banner-blocks">
            <div className="banner-ad large block-1">
              <Swiper
                modules={[Autoplay, SwiperPagination]}
                autoplay={{ delay: 5500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop
              >
                {HERO.map((slide) => (
                  <SwiperSlide key={slide.title}>
                    <div className="hero-slide row g-0 w-100 align-items-center">
                      <div className="col-md-7 banner-content">
                        <span className="categories d-block mb-2">{slide.kicker}</span>
                        <h2 className="banner-title mb-3">{slide.title}</h2>
                        <p className="mb-4">{slide.text}</p>
                        <div className="d-flex flex-wrap gap-2">
                          <Link to={slide.cta} className="btn btn-primary rounded-3 px-4">
                            Shop now
                          </Link>
                          <a
                            href={chatLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp rounded-3 px-4 d-inline-flex align-items-center gap-2"
                          >
                            <IconWhatsApp size={18} />
                            Enquire
                          </a>
                        </div>
                      </div>
                      <div className="col-md-5 hero-media d-none d-md-flex">
                        {heroImage(slide.cat) && <img src={heroImage(slide.cat)} alt="" />}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="banner-ad small block-2" style={{ background: '#fff4e0' }}>
              <div className="hero-slide row g-0 w-100 align-items-center">
                <div className="col-7 banner-content">
                  <span className="categories d-block mb-1">Empty Tubes</span>
                  <h3 className="banner-title mb-3">Cosmetic &amp; pharma tubes</h3>
                  <Link to="/category/empty-tubes" className="btn btn-sm btn-dark-solid rounded-3 px-3">
                    Browse
                  </Link>
                </div>
                <div className="col-5 hero-media">
                  {heroImage('empty-tubes') && <img src={heroImage('empty-tubes')} alt="" />}
                </div>
              </div>
            </div>

            <div className="banner-ad small block-3" style={{ background: '#e8f3f6' }}>
              <div className="hero-slide row g-0 w-100 align-items-center">
                <div className="col-7 banner-content">
                  <span className="categories d-block mb-1">Machinery</span>
                  <h3 className="banner-title mb-3">Filling &amp; packing machines</h3>
                  <Link to="/category/machine" className="btn btn-sm btn-dark-solid rounded-3 px-3">
                    Browse
                  </Link>
                </div>
                <div className="col-5 hero-media">
                  {heroImage('machine') && <img src={heroImage('machine')} alt="" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- USP strip ---------- */}
      <section className="py-4 py-lg-5">
        <div className="container-fluid">
          <div className="row g-3">
            {USP.map(({ Icon, title, text }) => (
              <div className="col-6 col-lg-3" key={title}>
                <div className="feature-card">
                  <div className="icon">
                    <Icon />
                  </div>
                  <h3 className="h6 mb-1">{title}</h3>
                  <p className="small text-muted mb-0">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Categories ---------- */}
      <section className="py-5 bg-accent-subtle">
        <div className="container-fluid">
          <div className="section-title d-flex flex-wrap align-items-end justify-content-between gap-3">
            <div>
              <span className="sub d-block mb-1">Shop by department</span>
              <h2>Our product categories</h2>
            </div>
            <div className="d-flex align-items-center gap-3">
              <Link to="/categories" className="fw-semibold text-accent">
                View all →
              </Link>
              <div className="d-flex gap-2">
                <button ref={catPrev} className="swiper-prev" aria-label="Previous">
                  <IconChevronLeft />
                </button>
                <button ref={catNext} className="swiper-next" aria-label="Next">
                  <IconChevronRight />
                </button>
              </div>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              576: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
              1400: { slidesPerView: 6 },
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = catPrev.current
              swiper.params.navigation.nextEl = catNext.current
            }}
            navigation={{ prevEl: catPrev.current, nextEl: catNext.current }}
          >
            {CATEGORIES.map((c) => (
              <SwiperSlide key={c.slug} style={{ height: 'auto' }}>
                <CategoryCard category={c} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ---------- Deals ---------- */}
      <ProductCarousel
        sub="Limited time"
        title="Best discounts this week"
        products={deals}
        viewAll="/shop?sort=discount"
      />

      {/* ---------- Mid-page WhatsApp CTA ---------- */}
      <section className="py-5">
        <div className="container-fluid">
          <div
            className="rounded-4 p-4 p-lg-5 text-center text-lg-start"
            style={{ background: 'var(--dark-color)' }}
          >
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <h2 className="text-white mb-2">Need a bulk quote?</h2>
                <p className="mb-0" style={{ color: '#b9c0cc' }}>
                  Send us your list on WhatsApp — sizes, quantities and cap type — and we will
                  confirm rate and availability the same day.
                </p>
                <p className="urdu mb-0 mt-2" style={{ color: '#b9c0cc' }}>
                  اپنی لسٹ واٹس ایپ پر بھیجیں، ہم اسی دن ریٹ اور دستیابی کنفرم کر دیں گے۔
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <a
                  href={chatLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg rounded-3 d-inline-flex align-items-center gap-2 mb-2"
                >
                  <IconWhatsApp size={22} />
                  Message on WhatsApp
                </a>
                <a
                  href={`tel:${SITE.phones[0].replace(/-/g, '')}`}
                  className="btn btn-outline-light btn-lg rounded-3 d-inline-flex align-items-center gap-2 ms-lg-2"
                >
                  <IconPhone size={20} />
                  {SITE.phones[0]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Featured ---------- */}
      <ProductCarousel sub="Hand picked" title="Featured products" products={featured} viewAll="/shop" />

      {/* ---------- Category spotlight grid ---------- */}
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <div className="section-title">
            <span className="sub d-block mb-1">Popular right now</span>
            <h2>Top picks from our biggest departments</h2>
          </div>
          <div className="row g-4">
            {['pharma-jar', 'oil-shampoo', 'cream-jar'].map((slug) => {
              const cat = CATEGORIES.find((c) => c.slug === slug)
              const items = queryProducts({ category: slug }).slice(0, 3)
              return (
                <div className="col-lg-4" key={slug}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="h5 mb-0">{cat.name}</h3>
                    <Link to={`/category/${slug}`} className="small fw-semibold text-accent">
                      View all
                    </Link>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    {items.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- New arrivals ---------- */}
      <ProductCarousel sub="Just added" title="New arrivals" products={arrivals} viewAll="/shop" />

      {/* ---------- About strip ---------- */}
      <section className="py-5">
        <div className="container-fluid">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <span className="sub text-accent fw-bold text-uppercase small">About us</span>
              <h2 className="mt-2 mb-3">
                {SITE.name} — {SITE.slogan}
              </h2>
              <p>
                We supply high quality bottles, jars, capsules and cosmetic packaging from Shah Alam
                Market, Lahore. Pharmaceutical, cosmetic and food packing items are all available
                under one roof, in retail and in bulk.
              </p>
              <p className="urdu">
                جے ڈی ٹریڈر — اعتماد کا نام۔ اعلیٰ کوالٹی کی بوتلیں، جار، کیپسول اور کاسمیٹک پیکجنگ۔
                فارماسیوٹیکل، کاسمیٹک اور فوڈ پیکنگ کا سامان ایک ہی جگہ، بہترین قیمت پر۔
              </p>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link to="/about" className="btn btn-primary rounded-3 px-4">
                  More about us
                </Link>
                <Link to="/shop" className="btn btn-outline-light rounded-3 px-4">
                  Browse {PRODUCTS.length}+ products
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row g-3">
                {CATEGORIES.slice(0, 4).map((c) => (
                  <div className="col-6" key={c.slug}>
                    <CategoryCard category={c} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
