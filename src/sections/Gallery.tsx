const galleryImages = [
  '/images/kuva%203.jpg',
  '/images/kuva%205.jpg',
  '/images/kuva%202.jpg',
  '/images/kuva%206.jpg',
  '/images/kuva%204.jpg',
  '/images/kuva.jpg',
]

/** Vasemmalle liukuva kuvagalleria — suorakulmaiset kulmat, ei muuta. */
function Gallery() {
  const row = [...galleryImages, ...galleryImages]
  return (
    <section className="overflow-hidden bg-beige py-3">
      <div className="gallery-track flex w-max gap-2">
        {row.map((src, i) => (
          <div
            key={i}
            className="h-64 w-52 shrink-0 overflow-hidden md:h-80 md:w-72"
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
    </section>
  )
}

export default Gallery
