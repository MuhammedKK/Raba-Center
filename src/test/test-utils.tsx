import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router'
import i18n from '@/i18n'

interface Options extends Omit<RenderOptions, 'wrapper'> {
  route?: string
}

export function renderWithProviders(ui: ReactElement, { route = '/ar', ...options }: Options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </I18nextProvider>
    ),
    ...options,
  })
}

export * from '@testing-library/react'
