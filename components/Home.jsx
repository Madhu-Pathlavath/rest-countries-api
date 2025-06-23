
import SearchBar from '../components/SearchBar'
import SelectMenu from '../components/SelectMenu'
import CountriesList from '../components/CountriesList'
import { useState } from 'react'
import { useTheme } from "../hooks/useTheme"


export default function Home() {
    const [query, setQuery] = useState('')
   const [isDark] = useTheme()
  return (
        <>
             <main className={`${isDark? 'dark': ''}`}>
              <div className="search-filter-container">
                <SearchBar setQuery={setQuery} />
                <SelectMenu setQuery={setQuery}/>
              </div>
              {query === 'unmount' ? '' : <CountriesList query={query} />}
            </main>
        </>

  )
}
