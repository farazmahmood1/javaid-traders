import { CATEGORIES, PRODUCTS } from '../lib/catalog'
import usePageMeta from '../lib/usePageMeta'
import { Breadcrumbs } from '../components/Layout'
import CategoryCard from '../components/CategoryCard'

export default function Categories() {
  usePageMeta(
    'Categories',
    'All JD Trader departments: airless bottles, pump and lotion bottles, spray and mist bottles, serum bottles, roll-on bottles, jars and tins, lip gloss tubes and more.'
  )

  return (
    <>
      <Breadcrumbs trail={[{ label: 'Categories' }]} />

      <section className="py-4 py-lg-5">
        <div className="container-fluid">
          <div className="section-title text-center">
            <span className="sub d-block mb-1">Shop by department</span>
            <h1 className="h2">All categories</h1>
            <p className="text-muted mb-0">
              {PRODUCTS.length} products across {CATEGORIES.length} departments.
            </p>
          </div>

          <div className="row g-3 g-lg-4">
            {CATEGORIES.map((c) => (
              <div className="col-6 col-md-4 col-lg-3" key={c.slug}>
                <CategoryCard category={c} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
