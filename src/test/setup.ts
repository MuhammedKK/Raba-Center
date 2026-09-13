import '@testing-library/jest-dom/vitest'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import '@/i18n'
import { server } from '@/mocks/server'

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe = () => {}
  unobserve = () => {}
  disconnect = () => {}
  takeRecords = () => []
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
