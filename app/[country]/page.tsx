import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export async function generateStaticParams() {
  const countries = await fetch('https://restcountries.com/v2/all').then((res) => res.json())

  return countries.map((country: any) => ({
    country: country.name,
  }))
}

export async function generateMetadata(
  { params }: any,
): Promise<Metadata> {
  // read route params
  const country = decodeURIComponent(params.country)
  return {
    title: `${country} | Where in the world?`,
    description: `Information about ${country}`,
  }
}

async function getData(country: string) {
  const res = await fetch(`https://restcountries.com/v2/all`)
  // The return value is *no* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  let chosenContry: any
  data.forEach((obj: any) => {
    if (obj.name.toLowerCase() === decodeURIComponent(country).toLowerCase()) {
      chosenContry = obj;
      return;
    }
  })
  let borders = [] as String[]
  if (chosenContry.borders) {
    chosenContry.borders.forEach((border: string) => {
      data.forEach((obj: any) => {
        if (obj.alpha3Code === border) {
          console.log(obj.name)
          borders.push(obj.name)
        }
      })
    })
  }
  const countryData: any = {
    name: chosenContry.name,
    nativeName: chosenContry.nativeName,
    topLevelDomain: chosenContry.topLevelDomain[0],
    capital: chosenContry.capital,
    region: chosenContry.region,
    subregion: chosenContry.subregion,
    population: chosenContry.population,
    currencies: chosenContry.currencies,
    languages: chosenContry.languages,
    flag: chosenContry.flag,
    borders: borders
  }
  return countryData;
}

export default async function Page({ params }: { params: { country: string } }) {
  const data = await getData(params.country)
  return (<main className="min-h-screen bg-primary-400 dark:bg-secondary-400 text-secondary-900 dark:text-primary px-6 pt-8 pb-16 drop">
    <Link href="/" className="px-8 py-2 inline-block rounded-sm mb-12 bg-primary dark:bg-secondary drop-shadow">
      <FontAwesomeIcon className="pr-2" icon={faArrowLeft} />
      Back
    </Link>
    {
      data ?
        <>
          <div className="md:grid md:grid-cols-2 md:gap-20">
            <Image src={data.flag} height="0" width="0" className="w-full mb-8 aspect-[3/2] object-cover" alt={`${data.name}'s flag`} />
            <div>
              <h2 className="text-2xl font-extrabold mb-4">{data.name}</h2>
              <div className="lg:grid lg:grid-cols-2 gap-8">
                <div>
                  <p className="mb-2"><em className="font-semibold not-italic">Native Name:</em> {data.nativeName}</p>
                  <p className="mb-2"><em className="font-semibold not-italic">Population:</em> {new Intl.NumberFormat('en-US').format(data.population)}</p>
                  <p className="mb-2"><em className="font-semibold not-italic">Region:</em> {data.region}</p>
                  <p className="mb-2"><em className="font-semibold not-italic">Sub Region:</em> {data.subregion}</p>
                  {
                    data.capital ?
                      <p className="mb-2 pb-8"><em className="font-semibold not-italic">Capital:</em> {data.capital}</p>
                      : null
                  }
                </div>
                <div>
                  <p className="mb-2"><em className="font-semibold not-italic">Top Level Domain:</em> {data.topLevelDomain}</p>
                  {
                    data.currencies ?
                      <p className="mb-2"><em className="font-semibold not-italic">Currencies:</em> {
                        Object.keys(data.currencies).map((currency: any, idx: number) => {
                          return (idx + 1 === Object.keys(data.currencies).length ? data.currencies[currency].name : `${data.currencies[currency].name}, `)
                        })
                      }</p>
                      : null
                  }
                  <p className="mb-2 pb-8"><em className="font-semibold not-italic">Languages:</em> {
                    data.languages.map((language: any, idx: number) => {
                      if (idx + 1 !== data.languages.length) {
                        return `${language.name}, `
                      } else {
                        return language.name
                      }
                    })
                  }</p>
                </div>
              </div>
              {
                data.borders.length ?
                  <>
                    <h3 className="text-lg mb-4 font-semibold">Border Countries:</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {
                        data.borders.map((border: any, idx: number) => {
                          return (
                            <Link key={idx} href={`/${border}`} className="text-sm px-8 py-2 bg-primary dark:bg-secondary rounded-sm drop-shadow">
                              {border}
                            </Link>
                          )
                        })
                      }
                    </div>
                  </>
                  : null
              }
            </div>
          </div>
        </>
        : <p>Loading...</p>
    }
  </main>)
}