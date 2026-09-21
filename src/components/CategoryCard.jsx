import { Link } from 'react-router-dom'
import { img } from '../lib/format'

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="category-item">
      <img src={img(category.image, 240)} alt="" loading="lazy" width="104" height="104" />
      <h3 className="category-title">{category.name}</h3>
      <span className="category-count">{category.count} products</span>
    </Link>
  )
}
