import { useTranslation } from 'react-i18next'
import earlyInterventionImage from '@/assets/images/blog/blog-early-intervention.jpg'
import familyReadingImage from '@/assets/images/blog/blog-family-support.jpg'
import sensoryPlayImage from '@/assets/images/blog/blog-sensory-play.jpg'
import speechMilestonesImage from '@/assets/images/blog/blog-speech-milestones.jpg'
import type { BlogBlock, BlogPost } from '@/features/blog/blog.types'

const imageByPost: Record<BlogPost['image'], string> = {
  earlyIntervention: earlyInterventionImage,
  speechMilestones: speechMilestonesImage,
  sensoryPlay: sensoryPlayImage,
  familyReading: familyReadingImage,
}

function Block({ block }: { block: BlogBlock }) {
  const { t } = useTranslation('blog')

  switch (block.type) {
    case 'heading':
      return <h2 className="mt-8 text-xl font-bold text-neutral-900">{t(block.text)}</h2>
    case 'paragraph':
      return <p className="mt-4 leading-relaxed text-neutral-700">{t(block.text)}</p>
    case 'image':
      return (
        <figure className="mt-6">
          <img
            src={imageByPost[block.image]}
            alt=""
            aria-hidden
            className="w-full rounded-2xl object-cover"
            loading="lazy"
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-sm text-neutral-500">
              {t(block.caption)}
            </figcaption>
          )}
        </figure>
      )
    case 'quote':
      return (
        <blockquote className="border-primary-500 mt-6 border-s-4 ps-5 text-lg font-medium text-neutral-900 italic">
          “{t(block.text)}”
          {block.attribution && (
            <footer className="mt-2 text-sm font-normal text-neutral-500 not-italic">
              {t(block.attribution)}
            </footer>
          )}
        </blockquote>
      )
  }
}

export function BlogBlockRenderer({ body }: { body: BlogBlock[] }) {
  return (
    <div>
      {body.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  )
}
