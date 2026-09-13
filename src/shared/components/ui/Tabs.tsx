import { createContext, type ReactNode, useContext, useId, useState } from 'react'
import { cn } from '@/shared/utils/cn'

interface TabsContextValue {
  activeValue: string
  setActiveValue: (value: string) => void
  name: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tabs.* components must be used within <Tabs>')
  return context
}

interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

function Tabs({ defaultValue, children, className }: TabsProps) {
  const [activeValue, setActiveValue] = useState(defaultValue)
  const name = useId()

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue, name }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="tablist" className={cn('flex gap-2 border-b border-neutral-200', className)}>
      {children}
    </div>
  )
}

function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const { activeValue, setActiveValue } = useTabsContext()
  const isActive = activeValue === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveValue(value)}
      className={cn(
        '-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'border-primary-500 text-primary-700'
          : 'border-transparent text-neutral-400 hover:text-neutral-700',
      )}
    >
      {children}
    </button>
  )
}

function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const { activeValue } = useTabsContext()
  if (activeValue !== value) return null
  return (
    <div role="tabpanel" className="pt-6">
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export { Tabs }
