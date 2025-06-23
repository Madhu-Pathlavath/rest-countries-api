import React from 'react'
import { Link, useParams } from 'react-router'

export default function Error() {
  const { countryName } = useParams();
  
  return (
    <div className="error-container">
      <h1>Country Not Found</h1>
      {countryName && (
        <p>Sorry, we couldn't find any country named "{countryName}".</p>
      )}
      <p>Please check the spelling or try searching for a different country.</p>
      <Link to="/" className="back-button">
        <i className="fa-solid fa-arrow-left"></i>&nbsp; Back to Home
      </Link>
    </div>
  )
}
