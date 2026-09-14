export type CardBrand = 'visa' | 'mastercard'

export function CardBrandIcon({ brand, className }: { brand: CardBrand; className?: string }) {
  if (brand === 'visa') {
    return (
      <svg viewBox="0 0 48 32" role="img" aria-label="Visa" className={className}>
        <rect width="48" height="32" rx="4" fill="#1A1F71" />
        <text
          x="24"
          y="21"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="13"
          fontStyle="italic"
          fontWeight="700"
          fill="#ffffff"
        >
          VISA
        </text>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 32" role="img" aria-label="Mastercard" className={className}>
      <rect width="48" height="32" rx="4" fill="#F3F3F3" />
      <circle cx="19" cy="16" r="9" fill="#EB001B" />
      <circle cx="29" cy="16" r="9" fill="#F79E1B" />
      <path d="M24 9.5a9 9 0 0 1 0 13 9 9 0 0 1 0-13Z" fill="#FF5F00" />
    </svg>
  )
}
