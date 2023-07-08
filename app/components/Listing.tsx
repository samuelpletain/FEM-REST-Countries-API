'use client'
import { faChevronDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import { useEffect, useState } from "react";

export default function Listing(props: any) {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  const [toggleFilter, setToggleFilter] = useState(false);
  const [inputFilter, setInputFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [countries, setCountries] = useState(props.countries);
  useEffect(() => {
    const filteredCountries = props.countries.filter((country: any) => country.name.toLowerCase().includes(inputFilter.toLocaleLowerCase()))
    setCountries(filteredCountries)
  }, [inputFilter, props.countries])

  useEffect(() => {
    if (regionFilter !== "") {
      const filteredCountries = props.countries.filter((country: any) => country.region.toLowerCase() === regionFilter.toLocaleLowerCase())
      setCountries(filteredCountries)
    }
  }, [regionFilter, props.countries])

  return (
    <>
      <div className="sm:flex sm:gap-10 sm:mb-12 sm:justify-between">

        <div className="relative rounded-sm w-full dark:bg-secondary mb-12 sm:mb-0 drop-shadow sm:max-w-sm md:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-secondary-900 dark:text-primary" />
          </div>
          <input type="text" className='pl-12 pr-6 py-4 rounded-sm bg-primary dark:bg-secondary block w-full text-sm dark:outline-primary ' placeholder='Search for a country...' value={inputFilter} onChange={(e) => setInputFilter(e.target.value)} />
        </div>
        <div className='cursor-pointer relative px-6 py-4 text-sm bg-primary dark:bg-secondary text-secondary-900 dark:text-primary rounded-sm mb-8 md:mb-0 w-[200px] h-[52px] drop-shadow' onClick={() => setToggleFilter(!toggleFilter)}>
          <p>{regionFilter ? regionFilter : "Filter by Region"}</p>
          <div className="absolute flex items-center inset-y-0 right-6">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
          {
            toggleFilter ?
              <div className="bg-primary dark:bg-secondary rounded-sm absolute left-0 top-14 px-6 py-4 w-full cursor-pointer drop-shadow">
                {
                  regions.map((region: string, idx: number) => {
                    return (<p onClick={() => setRegionFilter(region)} key={idx} className="pb-1 last:pb-0">{region}</p>);
                  })
                }
              </div>
              : null

          }
        </div>
      </div>
      <div className="flex flex-col items-center sm:items-start sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {
          countries ? countries.map((country: any, idx: number) => {
            return (
              <Card key={idx} className="w-64 sm:w-auto shadow rounded-md"
                countryFlag={country.flags.svg} countryName={country.name} content={{
                  population: country.population,
                  region: country.region,
                  capital: country.capital
                }} />
            )
          }) : <p>Loarding...</p>
        }
      </div>
    </>
  )
}