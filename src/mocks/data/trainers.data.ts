import type { Trainer } from '@/features/trainers/trainers.types'

// Real trainer roster imported from the center's official site (raba-center.com/trainers).
// Only fields actually published there are populated — see PLAN.md for the source audit.
export const trainersData: Trainer[] = [
  {
    id: 'trainer-hanaa',
    slug: 'hanaa-mohammed-bashir',
    name: 'trainers:profiles.hanaa.name',
    role: 'trainers:profiles.hanaa.role',
    bio: 'trainers:profiles.hanaa.bio',
    qualifications: 'trainers:profiles.hanaa.qualifications',
    experience: 'trainers:profiles.hanaa.experience',
    rating: 4.9,
    photo: 'hanaa',
  },
  {
    id: 'trainer-ahmed',
    slug: 'ahmed-abu-zaid-anwar',
    name: 'trainers:profiles.ahmed.name',
    role: 'trainers:profiles.ahmed.role',
    bio: 'trainers:profiles.ahmed.bio',
    qualifications: 'trainers:profiles.ahmed.qualifications',
    experience: 'trainers:profiles.ahmed.experience',
    rating: 4.8,
    photo: 'ahmed',
  },
  {
    id: 'trainer-hisham',
    slug: 'hisham-salama',
    name: 'trainers:profiles.hisham.name',
    role: 'trainers:profiles.hisham.role',
    bio: 'trainers:profiles.hisham.bio',
    // No qualifications/experience field is published for this trainer on the source site.
    rating: 4.7,
    photo: 'hisham',
  },
  {
    id: 'trainer-doha',
    slug: 'doha-khaled-anwar',
    name: 'trainers:profiles.doha.name',
    role: 'trainers:profiles.doha.role',
    bio: 'trainers:profiles.doha.bio',
    qualifications: 'trainers:profiles.doha.qualifications',
    experience: 'trainers:profiles.doha.experience',
    rating: 4.9,
    photo: 'doha',
  },
]
