import React from 'react'
// redux & middleware
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import PropTypes from 'prop-types'
import { AppReducer, InitialState } from './Reducer'

// gebruik de logger middleware enkel in dev
const LoggerMiddleWare = createLogger({
  // eslint-disable-next-line
  predicate: (getState, action) => (
    process.env.NODE_ENV !== 'production'
  ),
})

// bundel alle middleware in 1 enhancer, maak dan de store
const ConfigureStore = (initState) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      LoggerMiddleWare,
    ),
  )
  return createStore(AppReducer, initState, enhancer)
}

// maak normale redux store met de config die de app reducer + middleware bevat,
// start met de InitialState uit de app reducer
const ReduxStore = ConfigureStore(InitialState)


const Store = ({ children }) => (
  <Provider store={ReduxStore}>
    {children}
  </Provider>
)
Store.propTypes = {
  children: PropTypes.element.isRequired,
}
export default Store
