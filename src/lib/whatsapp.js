import { SITE } from './site'
import { money, niceTitle } from './format'

const base = () => `https://wa.me/${SITE.whatsapp}`

const open = (text) => `${base()}?text=${encodeURIComponent(text)}`

/** Generic "talk to us" link used in the header, footer and floating button. */
export const chatLink = () =>
  open(`Hello ${SITE.name}!\nI would like information about your products.`)

/** Product page → asks about one specific item, with the link so JD knows which. */
export const productInquiry = (product, qty = 1) =>
  open(
    [
      `Hello ${SITE.name}!`,
      '',
      `I am interested in this product:`,
      `*${niceTitle(product.title)}*`,
      `Price: ${money(product.price)}`,
      qty > 1 ? `Quantity: ${qty}` : null,
      '',
      `${window.location.origin}/product/${product.slug}`,
    ]
      .filter(Boolean)
      .join('\n')
  )

/** Cart → one message listing everything, since there is no online checkout. */
export const cartInquiry = (items, total) =>
  open(
    [
      `Hello ${SITE.name}!`,
      '',
      `Please share the price and availability for these products:`,
      '',
      ...items.map(
        (it, i) =>
          `${i + 1}. ${niceTitle(it.title)}\n   Quantity: ${it.qty} × ${money(it.price)} = ${money(
            it.qty * it.price
          )}`
      ),
      '',
      `*Estimated total: ${money(total)}*`,
      '',
      'Thank you!',
    ].join('\n')
  )
