import React from 'react'
import { useState, useEffect } from 'react'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer'

export default function CountriesList({query}) {
  const [countriesData, setCountriesData] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    console.log("Fetching countries data..."); // Debug log
    
    // Set loading to true when starting the fetch
    setLoading(true);
    
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data received, countries count:", data.length); // Debug log
        setCountriesData(data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false); // Also set loading to false on error
      });
  }, []);

  console.log("Loading state:", loading); // Debug log

  // Show shimmer while loading
  if (loading) {
    console.log("Rendering shimmer component"); // Debug log
    return <CountriesListShimmer />;
  }

  // // Filter countries based on search query
  // const filteredCountries = countriesData.filter((country) =>
  //   country.name.common.toLowerCase().includes(query.toLowerCase())
  // );


    // Filter countries based on search query
  const filteredCountries = countriesData.filter((country) => {
    // If no query, show all countries
    if (!query) return true;
    
    // Check if we're filtering by region (from dropdown)
    const regionNames = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
    
    if (regionNames.includes(query)) {
      // Filter by region - exact match with case sensitivity
      return country.region === query;
    } else {
      // Filter by country name (from search input)
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    }
  });

  console.log("Rendering countries list, filtered count:", filteredCountries.length); // Debug log

  return (
    <div className="countries-container">
      {filteredCountries.map((country) => (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          flag={country.flags.svg}
          population={country.population}
          region={country.region}
          capital={country.capital?.[0]}
        />
      ))}
    </div>
  )
}
