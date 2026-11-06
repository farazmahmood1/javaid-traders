import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { CATEGORIES, SORTS, getCategory, queryProducts } from '../lib/catalog'
import { SITE } from '../lib/site'
import usePageMeta from '../lib/usePageMeta'
import { Breadcrumbs } from '../components/Layout'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import NotFound from './NotFound'

const PER_PAGE = 24

/** Serves both /shop and /category/:slug — the only difference is a locked category. */
export default function Shop({ mode = 'shop' }) {
  const { slug } = useParams()
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const lockedCategory = mode === 'category' ? slug : null
  const category = lockedCategory || params.get('cat') || ''
  const search = params.get('q') || ''
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'featured'
  const inStock = params.get('stock') === '1'
  const page = Math.max(1, parseInt(params.get('page') || '1', 10) || 1)

  const catInfo = category ? getCategory(category) : null

  const results = useMemo(
    () => queryProducts({ category, search, sort, inStock }),
    [category, search, sort, inStock]
  )

  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const safePage = Math.min(page, pages)
  const slice = results.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  const heading = catInfo ? catInfo.name : search ? `Results for “${search}”` : 'All Products'

  usePageMeta(
    heading,
    catInfo
      ? `${catInfo.name} — ${catInfo.count} products available at wholesale rates from ${SITE.name}, Shah Alam Market Lahore.`
      : `Browse the full ${SITE.name} catalogue: airless bottles, pump and lotion bottles, serum bottles, jars, tubes and more.`
  )

  /** Writes one param and always resets paging, so filters never land on an empty page. */
  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => {
      if (v === '' || v == null || v === false) next.delete(k)
      else next.set(k, String(v))
    })
    if (!('page' in patch)) next.delete('page')
    setParams(next)
  }

  if (mode === 'category' && !catInfo) return <NotFound />

  const filters = (
    <>
      <div className="filter-box mb-3">
        <h5>Departments</h5>
        <ul className="filter-list list-unstyled mb-0">
          {!lockedCategory && (
            <li>
              <a
                href="#all"
                className={category ? '' : 'active'}
                onClick={(e) => {
                  e.preventDefault()
                  update({ cat: '' })
                }}
              >
                <span>All departments</span>
              </a>
            </li>
          )}
          {CATEGORIES.map((c) =>
            lockedCategory ? (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`} className={c.slug === category ? 'active' : ''}>
                  <span>{c.name}</span>
                  <span className="count">{c.count}</span>
                </Link>
              </li>
            ) : (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className={c.slug === category ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    update({ cat: c.slug === category ? '' : c.slug })
                  }}
                >
                  <span>{c.name}</span>
                  <span className="count">{c.count}</span>
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      <div className="filter-box">
        <h5>Availability</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="in-stock"
            checked={inStock}
            onChange={(e) => update({ stock: e.target.checked ? '1' : '' })}
          />
          <label className="form-check-label" htmlFor="in-stock">
            In stock only
          </label>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Breadcrumbs
        trail={
          catInfo
            ? [{ label: 'Categories', to: '/categories' }, { label: catInfo.name }]
            : [{ label: search ? 'Search' : 'All Products' }]
        }
      />

      <section className="py-4 py-lg-5">
        <div className="container-fluid">
          <div className="row g-4">
            <aside className="col-lg-3">
              <button
                type="button"
                className="btn btn-outline-light w-100 rounded-3 d-lg-none mb-3"
                onClick={() => setShowFilters((v) => !v)}
                aria-expanded={showFilters}
              >
                {showFilters ? 'Hide filters' : 'Show filters'}
              </button>
              <div className={showFilters ? '' : 'd-none d-lg-block'}>{filters}</div>
            </aside>

            <div className="col-lg-9">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <div>
                  <h1 className="h3 mb-1 break-word">{heading}</h1>
                  <p className="small text-muted mb-0">
                    {results.length} product{results.length === 1 ? '' : 's'}
                    {results.length > PER_PAGE && ` · page ${safePage} of ${pages}`}
                  </p>
                </div>

                <div className="d-flex align-items-center gap-2">
                  {search && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-light rounded-3"
                      onClick={() => update({ q: '' })}
                    >
                      Clear search
                    </button>
                  )}
                  <label className="small text-muted mb-0" htmlFor="sort">
                    Sort
                  </label>
                  <select
                    id="sort"
                    className="form-select form-select-sm rounded-3"
                    style={{ width: 'auto' }}
                    value={sort}
                    onChange={(e) => update({ sort: e.target.value === 'featured' ? '' : e.target.value })}
                  >
                    {Object.entries(SORTS).map(([key, { label }]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {slice.length === 0 ? (
                <div className="empty-state">
                  <h2 className="h5 mb-2">No products found</h2>
                  <p className="mb-3">Try a different department or a shorter search term.</p>
                  <Link to="/shop" className="btn btn-primary rounded-3">
                    View all products
                  </Link>
                </div>
              ) : (
                <>
                  <div className="row g-3 g-lg-4">
                    {slice.map((p) => (
                      <div className="col-6 col-md-4 col-xxl-3" key={p.id}>
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>
                  <Pagination
                    page={safePage}
                    pages={pages}
                    onChange={(n) => update({ page: n === 1 ? '' : n })}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
