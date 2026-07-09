import type { ReactNode } from 'react'

/** Pieni ylätunniste osioiden yläpuolelle. */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-medium uppercase tracking-[0.18em] text-taupe">
      {children}
    </p>
  )
}

export default Eyebrow
