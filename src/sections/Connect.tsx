import { Recycle } from 'lucide-react'

const photos = [
  '/images/kuva%204.jpg',
  '/images/kuva%206.jpg',
  '/images/kuva%202.jpg',
]

function Connect() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-brown sm:text-3xl">
            Yhdistämme ihmisiä ja vaatteita.
          </h2>
          <p className="mt-5 max-w-md text-lg text-brown/75">
            ReSello tuo kirpputorit, myyjät ja ostajat yhteen — ja tekee
            kiertotaloudesta arjen juttu.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-peach/30">
            {photos.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Kirpputorin ihmisiä ja vaatteita"
                style={{ animationDelay: `${-(2 + i * 3.5)}s` }}
                className="connect-photo absolute inset-0 h-full w-full object-cover"
              />
            ))}
          </div>

          {/* Pyörivä ympyrä */}
          <div className="absolute -right-3 -top-3 md:-right-6 md:-top-6">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-brown text-beige shadow-lg md:h-28 md:w-28">
              <svg
                viewBox="0 0 100 100"
                className="connect-spin absolute inset-0 h-full w-full"
              >
                <defs>
                  <path
                    id="connectCircle"
                    d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  style={{ fontSize: '10.5px', letterSpacing: '1.5px', fontWeight: 600 }}
                >
                  <textPath href="#connectCircle">
                    YHDISTÄMME · IHMISIÄ · JA · VAATTEITA ·&nbsp;
                  </textPath>
                </text>
              </svg>
              <Recycle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Connect
