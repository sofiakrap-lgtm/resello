import type { ReactNode } from 'react'

interface ButtonProps {
  href: string
  variant?: 'fill' | 'outline'
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-beige'

const variants = {
  fill: 'bg-brown text-beige hover:bg-brown/90',
  outline: 'border border-brown text-brown hover:bg-brown/5',
}

/** Pyöristetty CTA-nappi. Renderöityy linkkinä. */
function Button({ href, variant = 'fill', children }: ButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </a>
  )
}

export default Button
