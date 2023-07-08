import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from './components/Card'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Listing from './components/Listing'

export const metadata = {
  title: 'Where in the world?',
  description: 'REST Countries API with color theme switcher',
}

async function getData() {
  const res = await fetch('https://restcountries.com/v2/all')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()

  let regions: string[] = []
  data.map((country: any) => {
    if (!regions.includes(country.region)) {
      regions.push(country.region)
    }
  })

  return [regions, data];
}

export default async function Home() {
  const [regions, countries] = await getData()

  return (
    <div className="text-secondary-900 dark:text-primary px-4 pt-8 sm:pt-12 min-h-screen pb-16 container">
      <Listing regions={regions} countries={countries} />
    </div>
  )
}
