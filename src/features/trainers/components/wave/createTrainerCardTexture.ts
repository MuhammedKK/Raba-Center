import * as THREE from 'three'

const WIDTH = 640
const HEIGHT = 853
const RADIUS = 36
const CAPTION_HEIGHT = 168

function roundedRectPath(ctx: CanvasRenderingContext2D, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(r, 0)
  ctx.arcTo(w, 0, w, h, r)
  ctx.arcTo(w, h, 0, h, r)
  ctx.arcTo(0, h, 0, 0, r)
  ctx.arcTo(0, 0, w, 0, r)
  ctx.closePath()
}

/**
 * Bakes a photo + name + role into a single canvas texture — a "full card"
 * (rounded corners, frosted caption panel) rendered entirely in WebGL rather
 * than mixed with DOM overlays, which sidesteps drei's Html "transform" mode
 * (it doesn't handle this app's combination of a 3D perspective rig + RTL
 * document direction correctly — cards rendered thousands of pixels offscreen).
 */
export function createTrainerCardTexture(
  image: CanvasImageSource,
  name: string,
  role: string,
  isDark: boolean,
) {
  const canvas = document.createElement('canvas')
  canvas.width = WIDTH
  canvas.height = HEIGHT
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  roundedRectPath(ctx, WIDTH, HEIGHT, RADIUS)
  ctx.clip()

  // Photo fills the whole card, cover-fit.
  const imgWidth = (image as HTMLImageElement).naturalWidth || (image as HTMLImageElement).width
  const imgHeight = (image as HTMLImageElement).naturalHeight || (image as HTMLImageElement).height
  const cardRatio = WIDTH / HEIGHT
  const imgRatio = imgWidth / imgHeight
  let sx = 0
  let sy = 0
  let sWidth = imgWidth
  let sHeight = imgHeight
  if (imgRatio > cardRatio) {
    sWidth = imgHeight * cardRatio
    sx = (imgWidth - sWidth) / 2
  } else {
    sHeight = imgWidth / cardRatio
    sy = (imgHeight - sHeight) / 2
  }
  ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, WIDTH, HEIGHT)

  // Frosted caption panel at the bottom, matching the app's Card.Body look.
  const panelTop = HEIGHT - CAPTION_HEIGHT
  ctx.fillStyle = isDark ? 'rgba(23, 23, 23, 0.88)' : 'rgba(255, 255, 255, 0.92)'
  ctx.fillRect(0, panelTop, WIDTH, CAPTION_HEIGHT)

  ctx.textAlign = 'center'
  ctx.fillStyle = isDark ? '#fafafa' : '#171717'
  ctx.font = '700 40px "IBM Plex Sans Arabic", "Sora", system-ui, sans-serif'
  ctx.fillText(name, WIDTH / 2, panelTop + 66, WIDTH - 48)

  ctx.fillStyle = '#5b5fef'
  ctx.font = '600 30px "IBM Plex Sans Arabic", "Inter", system-ui, sans-serif'
  ctx.fillText(role, WIDTH / 2, panelTop + 118, WIDTH - 48)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}
