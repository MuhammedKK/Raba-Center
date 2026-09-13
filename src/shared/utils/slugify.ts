export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w؀-ۿ\s-]/g, '')
    .replace(/\s+/g, '-')
}
