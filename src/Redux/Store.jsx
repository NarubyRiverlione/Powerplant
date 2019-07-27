import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'
import logger from 'use-reducer-logger'

import { AppReducer, InitialState } from './Reducer'

export const AppContext = createContext()

const CreateReducer = dev => (dev ? logger(AppReducer) : AppReducer)

const Store = ({ children }) => {
  // state maken uit initiële state
  // dispatch uit reducer om acties uit te sturen
  const dev = false // process.env.NODE_ENV
  const [state, dispatch] = useReducer(CreateReducer(dev), InitialState)

  // context value
  // alles uit state halen
  // dispatch om actie op te roepen om aanpassingen uit te voeren
  const ContextValue = {
    state,
    dispatch,
  }


  return (
    <AppContext.Provider value={ContextValue}>
      {children}
    </AppContext.Provider>
  )
}
Store.propTypes = {
  children: PropTypes.element.isRequired,
}
export default Store
