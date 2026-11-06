# JD Trader — React catalogue site

A React rebuild of [jdtrader.pk](https://www.jdtrader.pk/) (JD Trader / Jawad Bottle Store,
Shah Alam Market, Lahore) on the **FoodMart** Bootstrap template.

It is a **catalogue, not a shop**: there is no checkout, no payment and no delivery form.
Every order path ends on WhatsApp.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the production build
```

---

## ⚠️ Set the WhatsApp number first

Everything WhatsApp-related reads one constant. Open
[`src/lib/site.js`](src/lib/site.js) and replace the placeholder:

```js
// international format, no "+", no spaces, no dashes
whatsapp: '923334231104',
```

`0333-4231104` → `923334231104`. Phones, email, address and social links live in the
same file.

---

## Pages

| Route | What it does |
|---|---|
| `/` | Landing page: hero slider, categories, deals, featured, new arrivals |
| `/shop` | All 30 products — department filter, sort, search, pagination (24/page) |
| `/categories` | All 8 departments |
| `/category/:slug` | One department, same filter UI with the category locked |
| `/product/:slug` | Gallery, description, spec table, WhatsApp order button, related items |
| `/cart` | Enquiry list → one WhatsApp message |
| `/about`, `/contact` | Company info; contact form composes a WhatsApp message |

---

## Cart behaviour

Per the brief, the **product detail page has no Add-to-Cart and no Buy button** — only the
description and WhatsApp options. Items are added from the product cards in the listings
and carousels (the cart icon on the card, or the "Add to cart" button).

- Stored in `localStorage` under `jdtrader.cart.v1`
- Survives refresh; degrades gracefully if storage is blocked (private mode)
- No checkout. "Send order on WhatsApp" builds a single Urdu message listing every item,
  quantity, line total and an estimated total

To also put an Add-to-Cart button on the product page, add a button calling
`add(product, qty)` from `useCart()` in [`src/pages/ProductDetail.jsx`](src/pages/ProductDetail.jsx).

---

## Product data

`src/data/products.json` — **30 products in 8 categories**, with images hosted at
`https://dev.javedtraders.shop/`. Each product has a title, slug, description HTML,
an `images` array (first is the main photo) and one category. Prices are `0` and show as
"Price on request" until real rates are added.

To add or change a product, edit that file and keep each category's `count` in step.
The previous 862-product Shopify catalogue was removed; it is still in git history.

---

## Deployment

Static SPA — any static host works. Deep links need a rewrite to `index.html`:

- **Netlify** — `public/_redirects` is already in place
- **Vercel** — `vercel.json` is already in place
- **Apache** — add an `.htaccess` with `FallbackResource /index.html`
- **Nginx** — `try_files $uri $uri/ /index.html;`

```bash
npm run build     # deploy the dist/ folder
```

---

## Project layout

```
src/
├── data/products.json     catalogue (30 products, 8 categories)
├── lib/
│   ├── site.js            ⚠️ WhatsApp number + all contact details
│   ├── catalog.js         query / filter / sort / related-products
│   ├── whatsapp.js        message builders (chat, product, cart)
│   ├── format.js          money, image resizing, title casing, Urdu detection
│   └── usePageMeta.js     per-page <title> and meta description
├── context/CartContext.jsx    cart state + localStorage
├── components/            Header, Footer, ProductCard, CartPanel, carousels…
├── pages/                 Home, Shop, ProductDetail, Cart, Categories, About, Contact
└── styles/theme.css       FoodMart theme adapted to this brand
```

---

## Notes

- Urdu text is detected per-product and rendered RTL in Noto Nastaliq Urdu (`isUrdu()` in
  `format.js`), so the mixed English/Urdu descriptions from the old store read correctly.
- `_theme/` and `FoodMart-1.0.0.zip` are the original template, kept for reference only.
  Nothing in `src/` imports from them — safe to delete.
- The FoodMart licence requires keeping the TemplatesJungle credit link in the footer
  unless a no-attribution licence is purchased.
