import { Link } from 'react-router-dom'
import usePageMeta from '../lib/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found')

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="empty-state">
          <div className="display-1 fw-bold text-accent">404</div>
          <h1 className="h4 mb-2">We could not find that page</h1>
          <p className="mb-4">The link may be out of date, or the product may have been removed.</p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            <Link to="/" className="btn btn-primary rounded-3 px-4">
              Go home
            </Link>
            <Link to="/shop" className="btn btn-outline-light rounded-3 px-4">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
