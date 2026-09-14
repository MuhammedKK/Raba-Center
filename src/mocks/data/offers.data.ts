import type { Offer } from '@/features/home/home.types'

export const offersData: Offer[] = [
  {
    id: 'offer-aba-bundle',
    title: 'offers.aba.title',
    description: 'offers.aba.description',
    discountLabel: '50%',
    image: 'aba',
    link: { type: 'course', courseId: 'course-abat' },
    discountPercent: 50,
  },
  {
    id: 'offer-home-services',
    title: 'offers.homeServices.title',
    description: 'offers.homeServices.description',
    discountLabel: '50%',
    image: 'homeServices',
    link: { type: 'contact', service: 'home-services' },
  },
  {
    id: 'offer-training-bundle',
    title: 'offers.trainingBundle.title',
    description: 'offers.trainingBundle.description',
    discountLabel: '30%',
    image: 'trainingBundle',
    link: { type: 'course', courseId: 'course-supervisor' },
    discountPercent: 30,
  },
]
