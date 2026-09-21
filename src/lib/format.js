import { CURRENCY } from './site'

/** 1250 -> "Rs. 1,250"  |  1250.5 -> "Rs. 1,250.50" */
export function money(n) {
  if (n === null || n === undefined || Number.isNaN(n)) return 'Price on request'
  const hasPaisa = Math.round(n * 100) % 100 !== 0
  return `${CURRENCY} ${n.toLocaleString('en-PK', {
    minimumFractionDigits: hasPaisa ? 2 : 0,
    maximumFractionDigits: 2,
  })}`
}

/** Shows "Rs. 60 – Rs. 120" when a product has a price range. */
export function priceLabel(product) {
  if (!product.price) return 'Price on request'
  if (product.priceMax && product.priceMax !== product.price) {
    return `${money(product.price)} – ${money(product.priceMax)}`
  }
  return money(product.price)
}

export function discountPercent(product) {
  if (!product.compareAt || !product.price || product.compareAt <= product.price) return 0
  return Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
}

/** Shopify CDN supports on-the-fly resizing — ask for only what we render. */
export function img(src, width = 600) {
  if (!src) return '/images/placeholder.png'
  if (!src.includes('cdn.shopify.com')) return src
  return `${src}${src.includes('?') ? '&' : '?'}width=${width}`
}

/** Title-cases the shouty ALL-CAPS product titles from the old store. */
export function niceTitle(t = '') {
  const s = t.trim().replace(/\s+/g, ' ')
  if (s !== s.toUpperCase()) return s
  return s
    .toLowerCase()
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/\b(Ml|Cc|Gm|Kg|Pp|Hdp|Pet|Hm|Pvc|Jd)\b/g, (m) => m.toUpperCase())
}

export function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

/** True when a string leans Urdu/Arabic, so we can flip direction + font. */
export function isUrdu(text = '') {
  const urdu = (text.match(/[\u0600-\u06FF]/g) || []).length
  const latin = (text.match(/[A-Za-z]/g) || []).length
  return urdu > 0 && urdu >= latin
}
