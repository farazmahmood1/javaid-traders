import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { IconChevronLeft, IconChevronRight } from './Icons'

export default function ProductCarousel({ title, sub, products, viewAll }) {
  const prev = useRef(null)
  const next = useRef(null)

  if (!products?.length) return null

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="section-title d-flex flex-wrap align-items-end justify-content-between gap-3">
          <div>
            {sub && <span className="sub d-block mb-1">{sub}</span>}
            <h2>{title}</h2>
          </div>
          <div className="d-flex align-items-center gap-3">
            {viewAll && (
              <Link to={viewAll} className="fw-semibold text-accent">
                View all →
              </Link>
            )}
            <div className="d-flex gap-2">
              <button ref={prev} className="swiper-prev" aria-label="Previous">
                <IconChevronLeft />
              </button>
              <button ref={next} className="swiper-next" aria-label="Next">
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
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1400: { slidesPerView: 5 },
          }}
          onBeforeInit={(swiper) => {
            // Refs are attached after Swiper reads params, so wire them here.
            swiper.params.navigation.prevEl = prev.current
            swiper.params.navigation.nextEl = next.current
          }}
          navigation={{ prevEl: prev.current, nextEl: next.current }}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id} style={{ height: 'auto' }}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
