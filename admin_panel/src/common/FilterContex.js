// FilterContext.js
import React, { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

const FilterContext = createContext()

export const FilterProvider = ({ children }) => {
  const [prevFilters, setPrevFilters] = useState(() => {
    // Initialize filters from localStorage if available
    const storedFilters = localStorage.getItem('filters')
    return storedFilters ? JSON.parse(storedFilters) : {}
  })

  // Update localStorage whenever filters change
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(prevFilters))
  }, [prevFilters])

  return (
    <FilterContext.Provider value={{ prevFilters, setPrevFilters }}>
      {children}
    </FilterContext.Provider>
  )
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
export const useFilter = () => useContext(FilterContext)
