import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Tabs } from './Tabs'
import { renderWithProviders, screen } from '@/test/test-utils'

function TestTabs() {
  return (
    <Tabs defaultValue="inquiry">
      <Tabs.List>
        <Tabs.Trigger value="inquiry">Inquiry</Tabs.Trigger>
        <Tabs.Trigger value="home-service">Home Service</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="inquiry">Inquiry form</Tabs.Content>
      <Tabs.Content value="home-service">Home service form</Tabs.Content>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('shows the default tab content and marks it selected', () => {
    renderWithProviders(<TestTabs />)
    expect(screen.getByText('Inquiry form')).toBeInTheDocument()
    expect(screen.queryByText('Home service form')).not.toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Inquiry' })).toHaveAttribute('aria-selected', 'true')
  })

  it('switches content when a different trigger is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<TestTabs />)
    await user.click(screen.getByRole('tab', { name: 'Home Service' }))
    expect(screen.getByText('Home service form')).toBeInTheDocument()
    expect(screen.queryByText('Inquiry form')).not.toBeInTheDocument()
  })

  it('throws when Tabs.* is used outside of <Tabs>', () => {
    expect(() => renderWithProviders(<Tabs.Trigger value="x">Bad</Tabs.Trigger>)).toThrow(
      'Tabs.* components must be used within <Tabs>',
    )
  })
})
