/**
 * Rebuilds src/data/products.json from the old Shopify store.
 *
 *   node scripts/scrape-catalog.mjs
 *
 * Shopify exposes the whole catalogue publicly as JSON, so no API key is needed:
 *   /products.json?limit=250&page=N          every product
 *   /collections.json                        every collection + its image
 *   /collections/<handle>/products.json      which products sit in which collection
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ORIGIN = 'https://www.jdtrader.pk'
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'products.json')

/** Display names and Urdu labels for the store's collection handles. */
const CATS = [
  { slug: 'pharma-jar', name: 'Pharma Jar', ur: 'فارما جار' },
  { slug: 'cream-jar', name: 'Cream Jar', ur: 'کریم جار' },
  { slug: 'oil-shampoo', name: 'Oil & Shampoo Bottles', ur: 'آئل و شیمپو بوتل' },
  { slug: 'serum-bottel', name: 'Serum Bottle', ur: 'سیرم بوتل' },
  { slug: 'shilajit-jar', name: 'Shilajit Jar', ur: 'شلاجیت جار' },
  { slug: 'empty-tubes', name: 'Empty Tubes', ur: 'خالی ٹیوبز' },
  { slug: 'airless-bottle', name: 'Airless Bottle', ur: 'ایئرلیس بوتل' },
  { slug: 'food-jar', name: 'Food Jar', ur: 'فوڈ جار' },
  { slug: 'dish-wash', name: 'Dish Wash', ur: 'ڈش واش' },
  { slug: 'packing-pouch', name: 'Packing Pouch', ur: 'پیکنگ پاؤچ' },
  { slug: 'machine', name: 'Filling & Packing Machines', ur: 'فلنگ و پیکنگ مشین' },
  { slug: 'cosmetic-pro', name: 'Cosmetic Products', ur: 'کاسمیٹک پروڈکٹس' },
]

/**
 * Some products belong to no collection on the old store. Assign them by title
 * keyword; first match wins, and anything left over lands in cosmetic-pro.
 */
const RULES = [
  [/AIRLESS/i, 'airless-bottle'],
  [/POUCH/i, 'packing-pouch'],
  [/MACHINE|BLISTER|SEALER|FILLING/i, 'machine'],
  [/SHILAJIT/i, 'shilajit-jar'],
  [/SERUM/i, 'serum-bottel'],
  [/\bTUBE/i, 'empty-tubes'],
  [/DISH\s*WASH|SURF|DETERGENT/i, 'dish-wash'],
  [/HONEY|JAM|FOOD|ZAITOON|OLIVE|ACHAR/i, 'food-jar'],
  [/CREAM\s*JAR/i, 'cream-jar'],
  [/SHAMPOO|\bOIL\b|SPRAY|SAPRY|PUMP|NOZZLE|PHD|\bBOTTLE/i, 'oil-shampoo'],
  [/JAR|CAPSULE|CONTAINER|GRAM|\bGM\b/i, 'pharma-jar'],
  [/GUN|ARQ|PLANT|LITRE/i, 'machine'],
  [/ML|LTR|SET/i, 'cosmetic-pro'],
]

const get = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  return res.json()
}

/** Strips scripts, inline handlers and Shopify's wrapper markup from descriptions. */
const clean = (html) =>
  String(html || '')
    .replace(/<\s*(script|style|iframe)[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/\s(on\w+|style|class|id)\s*=\s*"[^"]*"/gi, '')
    .replace(/\s(on\w+|style|class|id)\s*=\s*'[^']*'/gi, '')
    .replace(/<\/?(span|font|div)[^>]*>/gi, '')
    .replace(/(<p>\s*(<br\s*\/?>)?\s*<\/p>\s*)+/gi, '')
    .trim()

async function main() {
  console.log('Fetching collections…')
  const { collections } = await get(`${ORIGIN}/collections.json?limit=250`)
  const imageOf = (slug) => {
    const c = collections.find((x) => x.handle === slug)
    return c?.image?.src.split('?')[0] || null
  }

  console.log('Mapping products to collections…')
  const memberOf = new Map() // product id -> [slug]
  for (const c of CATS) {
    for (let page = 1; page <= 10; page++) {
      const { products } = await get(`${ORIGIN}/collections/${c.slug}/products.json?limit=250&page=${page}`)
      if (!products.length) break
      for (const p of products) {
        if (!memberOf.has(p.id)) memberOf.set(p.id, [])
        memberOf.get(p.id).push(c.slug)
      }
    }
    process.stdout.write(`  ${c.slug}\n`)
  }

  console.log('Fetching products…')
  const raw = []
  const seen = new Set()
  for (let page = 1; page <= 20; page++) {
    const { products } = await get(`${ORIGIN}/products.json?limit=250&page=${page}`)
    if (!products.length) break
    for (const p of products) {
      if (seen.has(p.id)) continue
      seen.add(p.id)
      raw.push(p)
    }
    console.log(`  page ${page}: ${raw.length} so far`)
  }

  let autoCategorised = 0
  const products = raw
    // Drop the store's placeholder rows and anything with no photo to show.
    .filter((p) => p.images?.length && !/^sample$/i.test((p.title || '').trim()))
    .map((p) => {
      const variants = p.variants || []
      const prices = variants.map((v) => parseFloat(v.price)).filter((n) => !Number.isNaN(n))
      const compares = variants.map((v) => parseFloat(v.compare_at_price)).filter((n) => !Number.isNaN(n))

      let cats = memberOf.get(p.id) || []
      if (!cats.length) {
        const hit = RULES.find(([re]) => re.test(p.title))
        cats = [hit ? hit[1] : 'cosmetic-pro']
        autoCategorised++
      }

      const price = prices.length ? Math.min(...prices) : null
      const priceMax = prices.length ? Math.max(...prices) : null
      const compareAt = compares.length ? Math.max(...compares) : null

      const out = {
        id: String(p.id),
        slug: p.handle,
        title: (p.title || '').trim(),
        price,
        cats,
        images: p.images.map((i) => i.src.split('?')[0]),
      }
      if (priceMax !== price) out.priceMax = priceMax
      if (compareAt && compareAt > price) out.compareAt = compareAt
      if (!variants.some((v) => v.available)) out.soldOut = 1
      const desc = clean(p.body_html)
      if (desc) out.desc = desc
      if (variants.length > 1) {
        out.variants = variants.map((v) => ({
          title: v.title,
          price: parseFloat(v.price) || 0,
          available: !!v.available,
        }))
      }
      const options = (p.options || []).filter((o) => o.name !== 'Title')
      if (options.length) out.options = options.map((o) => ({ name: o.name, values: o.values }))
      return out
    })

  const categories = CATS.map((c) => ({
    ...c,
    image: imageOf(c.slug),
    count: products.filter((p) => p.cats.includes(c.slug)).length,
  }))

  fs.writeFileSync(
    OUT,
    JSON.stringify({
      meta: { source: 'jdtrader.pk', generated: new Date().toISOString().slice(0, 10), currency: 'PKR' },
      categories,
      products,
    })
  )

  console.log(`\nWrote ${products.length} products to ${OUT}`)
  console.log(`  ${autoCategorised} assigned a category by title keyword — worth a spot check`)
  categories.forEach((c) => console.log(`  ${c.slug.padEnd(16)} ${c.count}`))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
