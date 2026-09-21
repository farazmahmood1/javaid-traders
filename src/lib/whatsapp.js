import { SITE } from './site'
import { money, niceTitle } from './format'

const base = () => `https://wa.me/${SITE.whatsapp}`

const open = (text) => `${base()}?text=${encodeURIComponent(text)}`

/** Generic "talk to us" link used in the header, footer and floating button. */
export const chatLink = () =>
  open(`السلام علیکم ${SITE.name}!\nمجھے آپ کے پروڈکٹس کے بارے میں معلومات چاہیے۔`)

/** Product page → asks about one specific item, with the link so JD knows which. */
export const productInquiry = (product, qty = 1) =>
  open(
    [
      `السلام علیکم ${SITE.name}!`,
      '',
      `مجھے یہ پروڈکٹ چاہیے:`,
      `*${niceTitle(product.title)}*`,
      `قیمت: ${money(product.price)}`,
      qty > 1 ? `تعداد: ${qty}` : null,
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
      `السلام علیکم ${SITE.name}!`,
      '',
      `مجھے درج ذیل پروڈکٹس کی قیمت اور دستیابی چاہیے:`,
      '',
      ...items.map(
        (it, i) =>
          `${i + 1}. ${niceTitle(it.title)}\n   تعداد: ${it.qty} × ${money(it.price)} = ${money(
            it.qty * it.price
          )}`
      ),
      '',
      `*کل تخمینہ: ${money(total)}*`,
      '',
      'شکریہ!',
    ].join('\n')
  )
