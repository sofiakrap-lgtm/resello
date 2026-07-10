/** "Jännittääkö käyttöönotto?" — kuva puolikkaana, teksti tuesta. */
function Onboarding() {
  return (
    <section className="grid items-stretch md:grid-cols-2">
      {/* Kuva täyttää oman puolikkaan */}
      <div className="relative min-h-[16rem] md:min-h-[32rem]">
        <img
          src="/images/kuva%203.jpg"
          alt="Kirpputoriyrittäjä työskentelee"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center bg-card px-6 py-16 md:px-14 md:py-24">
        <div className="max-w-md">
          <h2 className="text-balance text-[1.1rem] font-bold leading-[1.2] text-brown sm:text-[1.35rem] md:text-[1.8rem]">
            Jännittääkö käyttöönotto tai siirto?
          </h2>
          <p className="mt-5 text-lg text-brown/75">
            Ei hätää. Meiltä saat tuen, tarvittavan koulutusmateriaalin sekä
            henkilökunnan ohjeistuksen — videoineen ja ohjekirjoineen.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Onboarding
