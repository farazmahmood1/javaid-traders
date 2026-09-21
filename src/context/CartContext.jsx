import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react'

const KEY = 'jdtrader.cart.v1'
const CartContext = createContext(null)

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((i) => i && i.id && i.qty > 0) : []
  } catch {
    // Private mode or blocked storage — start empty rather than crash the app.
    return []
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { item, qty } = action
      const found = state.find((i) => i.id === item.id)
      if (found) {
        return state.map((i) => (i.id === item.id ? { ...i, qty: Math.min(i.qty + qty, 9999) } : i))
      }
      return [...state, { ...item, qty }]
    }
    case 'setQty':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0)
    case 'remove':
      return state.filter((i) => i.id !== action.id)
    case 'clear':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, null, load)
  // Drives the slide-out cart panel from anywhere (header, product page, cards).
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable — the cart still works for this session */
    }
  }, [items])

  // Keep two tabs of the same site in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) dispatch({ type: 'clear' })
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0)
    const total = items.reduce((n, i) => n + i.qty * (i.price || 0), 0)
    return {
      items,
      count,
      total,
      isOpen,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      has: (id) => items.some((i) => i.id === id),
      qtyOf: (id) => items.find((i) => i.id === id)?.qty || 0,
      add: (product, qty = 1, { silent = false } = {}) => {
        dispatch({
          type: 'add',
          qty,
          item: {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.images?.[0] || null,
          },
        })
        if (!silent) setOpen(true)
      },
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty: Math.max(0, Math.min(qty, 9999)) }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }
  }, [items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
