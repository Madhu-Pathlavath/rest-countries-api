import React from 'react'
import './CountryDetailShimmer.css'

export default function CountryDetailShimmer({ isDark }) {
  return (
    <div className={`shimmer-details-container ${isDark ? 'dark' : ''}`}>
      {/* Back button */}
      <div className="shimmer-back-button shimmer-element"></div>
      
      <div className="shimmer-country-details">
        {/* Flag placeholder */}
        <div className="shimmer-flag shimmer-element"></div>
        
        <div className="shimmer-details-text-container">
          {/* Country name placeholder */}
          <div className="shimmer-title shimmer-element"></div>
          
          <div className="shimmer-details-text">
            {/* Generate 8 text lines for country details */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="shimmer-text-line shimmer-element"></div>
            ))}
          </div>
          
          <div className="shimmer-border-countries">
            {/* Border countries title */}
            <div className="shimmer-border-title shimmer-element"></div>
            
            {/* Generate 3 border country buttons */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="shimmer-border-country shimmer-element"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
