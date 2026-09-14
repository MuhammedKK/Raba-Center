import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { TeamBioCard } from './TeamBioCard'
import type { TeamMember } from '@/features/about/about.types'
import i18n from '@/i18n'
import { renderWithProviders, screen, waitFor } from '@/test/test-utils'

const member: TeamMember = {
  id: 'team-lead',
  name: 'team.members.lead.name',
  role: 'team.members.lead.role',
  credentials: 'team.members.lead.credentials',
  specialty: 'team.members.lead.specialty',
  bio: 'team.members.lead.bio',
  photo: 'lead',
}

describe('TeamBioCard', () => {
  it('does not render the full bio modal until expanded', () => {
    renderWithProviders(<TeamBioCard member={member} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens the bio modal with the full bio when "read bio" is clicked, and closes it', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TeamBioCard member={member} />)

    await user.click(screen.getByRole('button', { name: i18n.t('team.readBio', { ns: 'about' }) }))

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveTextContent(i18n.t('team.members.lead.bio', { ns: 'about' }))

    await user.click(screen.getByRole('button', { name: i18n.t('actions.close') }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })
})
