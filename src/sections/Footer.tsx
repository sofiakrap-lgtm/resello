function Footer() {
  return (
    <footer className="border-t border-brown/10 bg-beige">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <img src="/graphics/ReSello-hero.svg" alt="ReSello" className="h-6 w-auto" />
        <p className="text-brown/70">
          Kirpputorin käyttöjärjestelmä itsepalvelukirpputoreille.
        </p>
      </div>
    </footer>
  )
}

export default Footer
