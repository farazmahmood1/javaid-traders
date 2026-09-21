import { Link } from 'react-router-dom'
import { categoryNames } from '../lib/catalog'
import { discountPercent, img, money, niceTitle, priceLabel } from '../lib/format'
import { useCart } from '../context/CartContext'
import { IconCart, IconCheck } from './Icons'

export default function ProductCard({ product }) {
  const { add, has } = useCart()
  const inCart = has(product.id)
  const off = discountPercent(product)
  const cat = categoryNames(product)[0]
  const to = `/product/${product.slug}`

  return (
    <article className="product-item">
      {off > 0 && <span className="badge bg-danger badge-sale">-{off}%</span>}

      <button
        type="button"
        className={`btn-wishlist ${inCart ? 'is-active' : ''}`}
        onClick={() => add(product, 1)}
        aria-label={inCart ? `${product.title} is in your cart` : `Add ${product.title} to cart`}
        title={inCart ? 'In cart' : 'Add to cart'}
      >
        {inCart ? <IconCheck size={18} /> : <IconCart size={18} />}
      </button>

      <Link to={to} tabIndex={-1} aria-hidden="true">
        <figure>
          <img src={img(product.images[0], 420)} alt="" loading="lazy" width="420" height="420" />
        </figure>
      </Link>

      {cat && <div className="cat-tag">{cat.name}</div>}

      <h3 className="break-word">
        <Link to={to}>{niceTitle(product.title)}</Link>
      </h3>

      <div className="mt-auto pt-2">
        <div className="mb-2">
          <span className="price">{priceLabel(product)}</span>
          {off > 0 && <span className="price-old">{money(product.compareAt)}</span>}
        </div>

        {product.soldOut ? (
          <span className="badge bg-light text-muted w-100 py-2">Out of stock</span>
        ) : (
          <button
            type="button"
            className={`btn btn-sm w-100 rounded-3 ${inCart ? 'btn-outline-primary' : 'btn-primary'}`}
            onClick={() => add(product, 1)}
          >
            {inCart ? 'Added — add one more' : 'Add to cart'}
          </button>
        )}
      </div>
    </article>
  )
}
