import { AccreditationsSection } from '@/features/home/components/AccreditationsSection'
import { AccreditationStrip } from '@/features/home/components/AccreditationStrip'
import { FeaturedCourses } from '@/features/home/components/FeaturedCourses'
import { HeroSection } from '@/features/home/components/HeroSection'
import { OffersCarousel } from '@/features/home/components/OffersCarousel'
import { StatsSection } from '@/features/home/components/StatsSection'
import { TestimonialsCarousel } from '@/features/home/components/TestimonialsCarousel'
import { useHomeData } from '@/features/home/hooks/useHomeData'

export default function HomePage() {
  const { stats, offers, featuredCourses, testimonials, credentials, accreditations } =
    useHomeData()

  return (
    <div>
      <HeroSection />
      <AccreditationStrip credentials={credentials} />
      <StatsSection stats={stats} />
      <OffersCarousel offers={offers} />
      <FeaturedCourses courses={featuredCourses} />
      <TestimonialsCarousel testimonials={testimonials} />
      <AccreditationsSection accreditations={accreditations} />
    </div>
  )
}
