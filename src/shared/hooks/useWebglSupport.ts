import { useState } from 'react'

function detectWebgl() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    return false
  }
}

export function useWebglSupport() {
  const [isSupported] = useState(detectWebgl)
  return isSupported
}
