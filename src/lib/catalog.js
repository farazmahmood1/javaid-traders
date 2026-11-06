import data from '../data/products.json'

export const CATEGORIES = data.categories
export const PRODUCTS = data.products
export const META = data.meta

const bySlug = new Map(PRODUCTS.map((p) => [p.slug, p]))
const catBySlug = new Map(CATEGORIES.map((c) => [c.slug, c]))

export const getProduct = (slug) => bySlug.get(slug)
export const getCategory = (slug) => catBySlug.get(slug)

export const categoryNames = (product) =>
  (product.cats || []).map((s) => catBySlug.get(s)).filter(Boolean)

/** Cheap searchable index built once, so filtering stays instant. */
const haystack = new Map(
  PRODUCTS.map((p) => [p.id, `${p.title} ${(p.cats || []).join(' ')}`.toLowerCase()])
)

export const SORTS = {
  featured: { label: 'Featured', fn: null },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  'name-asc': { label: 'Name: A – Z', fn: (a, b) => a.title.localeCompare(b.title) },
  discount: {
    label: 'Biggest discount',
    fn: (a, b) => savingOf(b) - savingOf(a),
  },
}

const savingOf = (p) => (p.compareAt && p.price ? (p.compareAt - p.price) / p.compareAt : 0)

/**
 * The one query used by Shop, Category and Search.
 * Returns the filtered+sorted list; the caller handles paging.
 */
export function queryProducts({ category, search, sort = 'featured', min, max, inStock } = {}) {
  let list = PRODUCTS

  if (category) list = list.filter((p) => (p.cats || []).includes(category))

  if (search) {
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length) {
      list = list.filter((p) => {
        const h = haystack.get(p.id)
        return terms.every((t) => h.includes(t))
      })
    }
  }

  if (min != null) list = list.filter((p) => p.price >= min)
  if (max != null) list = list.filter((p) => p.price <= max)
  if (inStock) list = list.filter((p) => !p.soldOut)

  const sorter = SORTS[sort]?.fn
  return sorter ? [...list].sort(sorter) : list
}

/** Same category, cheapest price gap first — keeps suggestions relevant. */
export function relatedProducts(product, limit = 10) {
  const cat = (product.cats || [])[0]
  if (!cat) return []
  return PRODUCTS.filter((p) => p.id !== product.id && (p.cats || []).includes(cat))
    .sort((a, b) => Math.abs(a.price - product.price) - Math.abs(b.price - product.price))
    .slice(0, limit)
}

/** Products with a photo gallery first, then the rest — stable order, no reshuffling. */
export const featuredProducts = (n = 12) =>
  [...PRODUCTS.filter((p) => p.images.length > 1), ...PRODUCTS.filter((p) => p.images.length <= 1)]
    .filter((p) => !p.soldOut)
    .slice(0, n)

export const dealProducts = (n = 12) =>
  [...PRODUCTS].filter((p) => savingOf(p) > 0.1 && !p.soldOut).sort((a, b) => savingOf(b) - savingOf(a)).slice(0, n)

export const newArrivals = (n = 12) => PRODUCTS.slice(-n).reverse()

export const priceBounds = (() => {
  const prices = PRODUCTS.map((p) => p.price).filter((n) => n > 0)
  return { min: Math.min(...prices), max: Math.max(...prices) }
})()
