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

// Node's own built-in `localStorage` global (unconfigured, no --localstorage-file)
// is a non-functional stub that shadows jsdom's working implementation, which
// breaks anything relying on real persistence (zustand's `persist` middleware
// included). Replace it with a minimal in-memory Storage so persisted stores
// behave the same in tests as they do in a real browser.
class MemoryStorage implements Storage {
  private store = new Map<string, string>()

  get length() {
    return this.store.size
  }

  clear = () => this.store.clear()
  getItem = (key: string) => this.store.get(key) ?? null
  key = (index: number) => Array.from(this.store.keys())[index] ?? null
  removeItem = (key: string) => {
    this.store.delete(key)
  }
  setItem = (key: string, value: string) => {
    this.store.set(key, value)
  }
}

vi.stubGlobal('localStorage', new MemoryStorage())

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
