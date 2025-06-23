import React from 'react'
import { Link } from 'react-router'

export default function CountryCard({ name, flag, population, region, capital }) {
  return (
    <Link className="country-card" to={`/${name.toLowerCase()}`}>
      <img src={flag} alt={name + ' Flag'} />
      <div className="card-text">
        <h3 className="card-title">{name}</h3>
        <p>
          <b>Population: </b>
          {population.toLocaleString('en-IN')}
        </p>
        <p>
          <b>Region: </b>{region}
        </p>
        <p>
          <b>Capital: </b>{capital}
        </p>
      </div>
    </Link>
  )
}
