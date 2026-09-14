import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createTrainerCardTexture } from './createTrainerCardTexture'

const SPACING = 2.3
const CARD_WIDTH = 1.7
const CARD_HEIGHT = 2.27

interface TrainerWaveCardProps {
  index: number
  imageSrc: string
  name: string
  role: string
  isDark: boolean
  /** Mutable ref updated once per frame by the parent — avoids re-render churn. */
  focusIndexRef: React.MutableRefObject<number>
  onSelect: () => void
  onHover: (hovering: boolean) => void
}

export function TrainerWaveCard({
  index,
  imageSrc,
  name,
  role,
  isDark,
  focusIndexRef,
  onSelect,
  onHover,
}: TrainerWaveCardProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const baseTexture = useTexture(imageSrc)
  const cardTexture = useMemo(
    () => createTrainerCardTexture(baseTexture.image as CanvasImageSource, name, role, isDark),
    [baseTexture, name, role, isDark],
  )

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return

    const distance = index - focusIndexRef.current
    const x = distance * SPACING
    const wave = Math.sin(x * 1.1) * 0.16
    const depth = -Math.abs(distance) * 0.55
    const closeness = THREE.MathUtils.clamp(1 - Math.abs(distance), 0, 1)
    const scale = 0.78 + closeness * 0.32
    const bob = Math.sin(state.clock.elapsedTime * 1.2 + index) * 0.03

    mesh.position.set(x, wave + bob, depth)
    mesh.rotation.y = THREE.MathUtils.degToRad(-distance * 10)
    mesh.scale.setScalar(scale)
  })

  return (
    <mesh
      ref={meshRef}
      onClick={(event) => {
        event.stopPropagation()
        onSelect()
      }}
      onPointerOver={(event) => {
        event.stopPropagation()
        onHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        onHover(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT]} />
      <meshBasicMaterial map={cardTexture} transparent toneMapped={false} />
    </mesh>
  )
}
