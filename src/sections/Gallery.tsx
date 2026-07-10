const galleryImages = [
  '/images/kuva%203.jpg',
  '/images/kuva%205.jpg',
  '/images/kuva%202.jpg',
  '/images/kuva%206.jpg',
  '/images/kuva%204.jpg',
  '/images/kuva.jpg',
]

/** Vasemmalle liukuva kuvagalleria, jonka päällä paikallaan pysyvä teksti. */
function Gallery() {
  const row = [...galleryImages, ...galleryImages]
  return (
    <section className="relative overflow-hidden bg-brown py-20 md:py-28">
      <div className="gallery-track flex w-max gap-4 px-2">
        {row.map((src, i) => (
          <div
            key={i}
            className="h-64 w-48 shrink-0 overflow-hidden rounded-2xl md:h-80 md:w-64"
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Tumma sävy kuvien päällä tekstin luettavuudeksi */}
      <div className="pointer-events-none absolute inset-0 bg-brown/55" />

      {/* Paikallaan pysyvä teksti */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-[1.1rem] font-bold leading-[1.15] text-beige sm:text-[1.4rem] md:text-[1.85rem]">
            Jokainen vaate ja tavara on tehty käytettäväksi.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-beige/85 md:text-base">
            Kun sinulla ei ole enää tavaralle tarvetta, me olemme se, joka tekee
            sen kierrätyksestä helppoa ja hauskaa.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Gallery
