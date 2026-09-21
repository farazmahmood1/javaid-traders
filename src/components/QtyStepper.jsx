export default function QtyStepper({ value, onChange, size, min = 1, max = 9999 }) {
  const clamp = (n) => Math.max(min, Math.min(max, n))

  return (
    <div className={`qty-stepper ${size === 'lg' ? 'lg' : ''}`}>
      <button type="button" onClick={() => onChange(clamp(value - 1))} aria-label="Decrease quantity">
        &minus;
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        aria-label="Quantity"
        onChange={(e) => {
          const n = parseInt(e.target.value, 10)
          // Let the field go momentarily empty while typing instead of snapping to 1.
          if (!Number.isNaN(n)) onChange(clamp(n))
        }}
        onBlur={(e) => {
          if (e.target.value === '') onChange(min)
        }}
      />
      <button type="button" onClick={() => onChange(clamp(value + 1))} aria-label="Increase quantity">
        +
      </button>
    </div>
  )
}
