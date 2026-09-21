import { IconChevronLeft, IconChevronRight } from './Icons'

/** Compact pager: 1 … 4 5 [6] 7 8 … 42 */
function pageList(current, total) {
  const span = 1
  const out = new Set([1, total])
  for (let i = current - span; i <= current + span; i++) {
    if (i > 1 && i < total) out.add(i)
  }
  const sorted = [...out].sort((a, b) => a - b)
  const withGaps = []
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) withGaps.push('gap')
    withGaps.push(n)
  })
  return withGaps
}

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null

  return (
    <nav aria-label="Pagination" className="d-flex justify-content-center mt-4">
      <ul className="pagination mb-0 flex-wrap justify-content-center">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onChange(page - 1)} aria-label="Previous page">
            <IconChevronLeft size={16} />
          </button>
        </li>

        {pageList(page, pages).map((n, i) =>
          n === 'gap' ? (
            <li className="page-item disabled" key={`gap-${i}`}>
              <span className="page-link">…</span>
            </li>
          ) : (
            <li className={`page-item ${n === page ? 'active' : ''}`} key={n}>
              <button
                className="page-link"
                onClick={() => onChange(n)}
                aria-current={n === page ? 'page' : undefined}
              >
                {n}
              </button>
            </li>
          )
        )}

        <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onChange(page + 1)} aria-label="Next page">
            <IconChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  )
}
