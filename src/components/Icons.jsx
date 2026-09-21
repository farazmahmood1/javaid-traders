/** Inline SVG icons — avoids shipping an icon font for the dozen glyphs we use. */
const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false',
})

export const IconSearch = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M21.71 20.29 18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7Z" />
  </svg>
)

export const IconCart = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M8.5 19a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM21.9 6.4A1 1 0 0 0 21 6H6.2l-.3-1.6A1 1 0 0 0 4.9 3.6H3a1 1 0 0 0 0 2h1.1l1.9 9.8A2 2 0 0 0 8 17h10a1 1 0 0 0 0-2H8l-.2-1h10a2 2 0 0 0 2-1.6l1.2-5a1 1 0 0 0-.1-1Z" />
  </svg>
)

export const IconWhatsApp = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1a11.4 11.4 0 0 0 4.4 3.9c.6.2 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4l-.4-.2Z" />
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
  </svg>
)

export const IconPhone = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M19.4 15.1a12 12 0 0 1-3.7-.6 1 1 0 0 0-1 .2l-1.6 1.6a15 15 0 0 1-6.6-6.6l1.6-1.6a1 1 0 0 0 .3-1 12 12 0 0 1-.6-3.7A1 1 0 0 0 6.8 2.4H4.2a1 1 0 0 0-1 1A17.6 17.6 0 0 0 20.6 21a1 1 0 0 0 1-1v-2.6a1 1 0 0 0-1-1Z" />
  </svg>
)

export const IconMail = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.6 2L12 11.3 4.6 6ZM4 18V7.2l7.4 5.3a1 1 0 0 0 1.2 0L20 7.2V18Z" />
  </svg>
)

export const IconPin = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.3 6.7 11.8 7 12.1a.8.8 0 0 0 1 0c.3-.3 7-6.8 7-12.1A7.5 7.5 0 0 0 12 2Zm0 10.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
  </svg>
)

export const IconChevronLeft = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M15.4 17.6 10.8 13l4.6-4.6L14 7l-6 6 6 6z" />
  </svg>
)

export const IconChevronRight = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M8.6 17.6 13.2 13 8.6 8.4 10 7l6 6-6 6z" />
  </svg>
)

export const IconClose = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="m19 6.4-1.4-1.4-5.6 5.6-5.6-5.6L5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z" />
  </svg>
)

export const IconTrash = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z" />
  </svg>
)

export const IconMenu = ({ size = 22 }) => (
  <svg {...base(size)}>
    <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
  </svg>
)

export const IconCheck = ({ size = 18 }) => (
  <svg {...base(size)}>
    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
)

export const IconTruck = ({ size = 24 }) => (
  <svg {...base(size)}>
    <path d="M20 8h-3V5a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1.2a2.8 2.8 0 0 0 5.6 0h4.4a2.8 2.8 0 0 0 5.6 0H22a1 1 0 0 0 1-1v-4.4L20 8ZM7 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2-7h-2V9.8h1.6l1.4 1.8V11Z" />
  </svg>
)

export const IconShield = ({ size = 24 }) => (
  <svg {...base(size)}>
    <path d="M12 2 4 5.3v5.4c0 5 3.4 9.7 8 11.3 4.6-1.6 8-6.3 8-11.3V5.3L12 2Zm-1 14-4-4 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6Z" />
  </svg>
)

export const IconBox = ({ size = 24 }) => (
  <svg {...base(size)}>
    <path d="M21 8.3 12 3 3 8.3v7.4L12 21l9-5.3V8.3Zm-9 10.1-6.5-3.8V9.9L12 13.7l6.5-3.8v4.7L12 18.4Zm0-6.8L5.9 8l6.1-3.6L18.1 8 12 11.6Z" />
  </svg>
)

export const IconTag = ({ size = 24 }) => (
  <svg {...base(size)}>
    <path d="M21.4 11 13 2.6A2 2 0 0 0 11.6 2H4a2 2 0 0 0-2 2v7.6c0 .5.2 1 .6 1.4L11 21.4a2 2 0 0 0 2.8 0l7.6-7.6a2 2 0 0 0 0-2.8ZM6.5 8A1.5 1.5 0 1 1 8 6.5 1.5 1.5 0 0 1 6.5 8Z" />
  </svg>
)

export const IconFacebook = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M14 9V7c0-.8.2-1.2 1.4-1.2H17V3h-2.6C11.2 3 10 4.4 10 7v2H8v3h2v9h4v-9h2.7l.3-3h-3Z" />
  </svg>
)

export const IconInstagram = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1a6.6 6.6 0 0 1 2.2.4 4.5 4.5 0 0 1 2.2 2.2 6.6 6.6 0 0 1 .4 2.2c.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9a6.6 6.6 0 0 1-.4 2.2 4.5 4.5 0 0 1-2.2 2.2 6.6 6.6 0 0 1-2.2.4c-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1a6.6 6.6 0 0 1-2.2-.4 4.5 4.5 0 0 1-2.2-2.2 6.6 6.6 0 0 1-.4-2.2c-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9a6.6 6.6 0 0 1 .4-2.2A4.5 4.5 0 0 1 4.9 2.7a6.6 6.6 0 0 1 2.2-.4c1.3-.1 1.7-.1 4.9-.1Zm0 3.8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 9.9a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8Zm7.6-10.1a1.4 1.4 0 1 1-1.4-1.4 1.4 1.4 0 0 1 1.4 1.4Z" />
  </svg>
)

export const IconYoutube = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M22 12s0-3.3-.4-4.9a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 8.7 2 12 2 12s0 3.3.4 4.9a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15.3 22 12 22 12ZM10 15.2V8.8l5.5 3.2Z" />
  </svg>
)
