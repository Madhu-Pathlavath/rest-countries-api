import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import './CountryDetail.css'
import CountryDetailShimmer from './CountryDetailShimmer'
import { useTheme } from '../hooks/useTheme'

export default function CountryDetail() {
  const [isDark] = useTheme()
  const { countryName } = useParams()
  const [countryData, setCountryData] = useState(null)
  const [borderCountries, setBorderCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [fetchAttempted, setFetchAttempted] = useState(false)

  useEffect(() => {
    // Only fetch if we haven't attempted for this country yet
    if (fetchAttempted) return;
    
    // Reset states for new country
    setLoading(true);
    setNotFound(false);
    setCountryData(null);
    setBorderCountries([]);
    
    if (!countryName) {
      setNotFound(true);
      setLoading(false);
      setFetchAttempted(true);
      return;
    }

    // Fetch country data
    const fetchCountry = async () => {
      try {
        console.log(`Fetching data for ${countryName}...`); // Debug log
        
        // Add a small delay to make the shimmer effect more noticeable during testing
        // Remove this in production
        //await new Promise(resolve => setTimeout(resolve, 1500));
        
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fields=name,population,region,subregion,capital,flags,tld,currencies,languages,borders,cca3`
        );

        // If country not found or other error
        if (!response.ok) {
          setNotFound(true);
          setLoading(false);
          setFetchAttempted(true);
          return;
        }

        const data = await response.json();
        
        // If API returns empty array
        if (!data || data.length === 0) {
          setNotFound(true);
          setLoading(false);
          setFetchAttempted(true);
          return;
        }

        const countryInfo = data[0];
        setCountryData({
          name: countryInfo.name.common,
          nativeName: countryInfo.name.nativeName 
            ? Object.values(countryInfo.name.nativeName || {})[0]?.common 
            : countryInfo.name.common,
          population: countryInfo.population,
          region: countryInfo.region,
          subregion: countryInfo.subregion || 'N/A',
          capital: countryInfo.capital || ['N/A'],
          flag: countryInfo.flags.svg,
          tld: countryInfo.tld || ['N/A'],
          languages: countryInfo.languages 
            ? Object.values(countryInfo.languages || {}).join(', ')
            : 'N/A',
          currencies: countryInfo.currencies 
            ? Object.values(countryInfo.currencies || {})
                .map((currency) => currency.name)
                .join(', ')
            : 'N/A',
          borders: countryInfo.borders || []
        });

        // If there are border countries, fetch their full names
        if (countryInfo.borders && countryInfo.borders.length > 0) {
          fetchBorderCountries(countryInfo.borders);
        } else {
          setLoading(false);
          setFetchAttempted(true);
        }
      } catch (err) {
        // Any other errors also result in not found state
        console.error("Error fetching country data:", err);
        setNotFound(true);
        setLoading(false);
        setFetchAttempted(true);
      }
    };

    // Fetch border countries data
    const fetchBorderCountries = async (borderCodes) => {
      try {
        const codes = borderCodes.join(',');
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${codes}&fields=name,cca3`
        );
        
        if (!response.ok) {
          console.error("Error fetching border countries");
          setLoading(false);
          setFetchAttempted(true);
          return;
        }
        
        const borderData = await response.json();
        
        // Map border countries with their names and codes
        const borderCountriesWithNames = borderData.map(country => ({
          code: country.cca3,
          name: country.name.common
        }));
        
        setBorderCountries(borderCountriesWithNames);
        setLoading(false);
        setFetchAttempted(true);
      } catch (err) {
        console.error("Error processing border countries:", err);
        setLoading(false);
        setFetchAttempted(true);
      }
    };

    fetchCountry();
  }, [countryName, fetchAttempted]);

  // Reset fetch attempted when country changes
  useEffect(() => {
    setFetchAttempted(false);
  }, [countryName]);

  // Handle back button click
  const handleBackClick = (e) => {
    e.preventDefault();
    window.history.back(); // Use the browser's native history API
  };

  console.log("Loading state:", loading); // Debug log

  // Loading state - show shimmer
  if (loading) {
    console.log("Rendering shimmer component"); // Debug log
    return <CountryDetailShimmer isDark={isDark} />;
  }

  // Not Found state - custom user-friendly message
  if (notFound) {
    return (
      <div className="error-container">
        <h1>Country Not Found</h1>
        <p>Sorry, we couldn't find any country named "{countryName}".</p>
        <p>Please check the spelling or try searching for a different country.</p>
        <button onClick={handleBackClick} className="back-button">
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back to Home
        </button>
      </div>
    );
  }

  // Render country details
  return (
      <main className={isDark ? 'dark' : ''}>
    <div className="country-details-container">
      <button onClick={handleBackClick} className="back-button">
        <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
      </button>
      <div className="country-details">
        <img src={countryData.flag} alt={`${countryData.name} flag`} />
        <div className="details-text-container">
          <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: </b>
                <span className="native-name">{countryData.nativeName || countryData.name}</span>
              </p>
              <p>
                <b>Population: </b>
                <span className="population">{countryData.population.toLocaleString('en-IN')}</span>
              </p>
              <p>
                <b>Region: </b>
                <span className="region">{countryData.region}</span>
              </p>
              <p>
                <b>Sub Region: </b>
                <span className="sub-region">{countryData.subregion}</span>
              </p>
              <p>
                <b>Capital: </b>
                <span className="capital">{countryData.capital?.join(', ')}</span>
              </p>
              <p>
                <b>Top Level Domain: </b>
                <span className="top-level-domain">{countryData.tld.join(', ')}</span>
              </p>
              <p>
                <b>Currencies: </b>
                <span className="currencies">{countryData.currencies}</span>
              </p>
              <p>
                <b>Languages: </b>
                <span className="languages">{countryData.languages}</span>
              </p>
            </div>
            <div className="border-countries">
              <b>Border Countries: </b>&nbsp;
              {borderCountries.length > 0 ? (
                borderCountries.map(border => (
                  <Link 
                    key={border.code} 
                    to={`/${border.name.toLowerCase()}`} 
                    className="border-country"
                  >
                    {border.name}
                  </Link>
                ))
              ) : (
                <span>No bordering countries</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}