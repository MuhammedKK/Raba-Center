import type { Trainer } from '@/features/trainers/trainers.types'

// Trainers are the same certified specialists introduced on the About page —
// course instruction is led by the center's own clinical team, not outside
// contractors — so profile copy is reused from the `about` namespace
// (`about:team.members.<id>.*`) instead of duplicating it in `trainers.json`.
export const trainersData: Trainer[] = [
  {
    id: 'trainer-lead',
    slug: 'lama-al-harbi',
    name: 'about:team.members.lead.name',
    role: 'about:team.members.lead.role',
    credentials: 'about:team.members.lead.credentials',
    specialty: 'about:team.members.lead.specialty',
    bio: 'about:team.members.lead.bio',
    photo: 'lead',
  },
  {
    id: 'trainer-behavior',
    slug: 'omar-al-sayed',
    name: 'about:team.members.behavior.name',
    role: 'about:team.members.behavior.role',
    credentials: 'about:team.members.behavior.credentials',
    specialty: 'about:team.members.behavior.specialty',
    bio: 'about:team.members.behavior.bio',
    photo: 'behavior',
  },
  {
    id: 'trainer-speech',
    slug: 'hind-al-qahtani',
    name: 'about:team.members.speech.name',
    role: 'about:team.members.speech.role',
    credentials: 'about:team.members.speech.credentials',
    specialty: 'about:team.members.speech.specialty',
    bio: 'about:team.members.speech.bio',
    photo: 'speech',
  },
  {
    id: 'trainer-occupational',
    slug: 'yousef-al-otaibi',
    name: 'about:team.members.occupational.name',
    role: 'about:team.members.occupational.role',
    credentials: 'about:team.members.occupational.credentials',
    specialty: 'about:team.members.occupational.specialty',
    bio: 'about:team.members.occupational.bio',
    photo: 'occupational',
  },
]
