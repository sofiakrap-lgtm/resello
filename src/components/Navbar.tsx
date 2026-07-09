import Button from './Button.tsx'

const links = [
  { href: '#ominaisuudet', label: 'Ominaisuudet' },
  { href: '#nakyvyys', label: 'Näkyvyys' },
  { href: '#hinnoittelu', label: 'Hinnoittelu' },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-brown/10 bg-beige/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-beige rounded-md"
        >
          ReSello
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base text-brown/80 transition-colors hover:text-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2 focus-visible:ring-offset-beige rounded-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="#varaa">Varaa esittely</Button>
      </div>
    </header>
  )
}

export default Navbar
