import type { SVGAttributes } from 'react'

export type SocialPlatform = 'facebook' | 'instagram' | 'x' | 'linkedin'

const paths: Record<SocialPlatform, string> = {
  facebook:
    'M14 9V6.5a1.5 1.5 0 0 1 1.5-1.5H17V2h-2.5A4.5 4.5 0 0 0 10 6.5V9H8v3h2v10h3V12h2.5l.5-3H13V9.5A.5.5 0 0 1 13.5 9H14z',
  instagram:
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.8 6a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 17.8 6z',
  x: 'M3 3l7.4 9.6L3.2 21h2.3l6.3-7.3L17 21h4l-7.7-10 6.8-8h-2.3l-5.8 6.7L7 3H3zm3.4 1.6h1.8l10.4 13.8h-1.8L6.4 4.6z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9.5h4V21H3V9.5zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4V9.5z',
}

interface SocialIconProps extends SVGAttributes<SVGSVGElement> {
  platform: SocialPlatform
}

export function SocialIcon({ platform, ...props }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden {...props}>
      <path d={paths[platform]} />
    </svg>
  )
}
