/** Pure link builders. Callers pass already-locale-resolved text (branch name,
 * address) so this logic stays testable without mocking i18next. */

export function buildWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function buildMapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}
