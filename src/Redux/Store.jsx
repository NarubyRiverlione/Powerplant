import React from 'react'
// redux & middleware
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import { createLogger } from 'redux-logger'

import PropTypes from 'prop-types'
import AppReducer from './Reducer'
import InitialState from './InitialState'


/*
// logger middleware only in dev
const LoggerMiddleWare = createLogger({
  // eslint-disable-next-line
  predicate: (getState, action) => (
    process.env.NODE_ENV !== 'production'
  ),
})
*/

//  make a store configuration by adding all the middleware in 1 enhancer
const ConfigureStore = (initState) => {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      // LoggerMiddleWare,
    ),
  )
  return createStore(AppReducer, initState, enhancer)
}

//  create the store via de enchancer and the InitialState
const ReduxStore = ConfigureStore(InitialState)

// Wrap the Store around the App
const Store = ({ children }) => (
  <Provider store={ReduxStore}>
    {children}
  </Provider>
)
Store.propTypes = {
  children: PropTypes.element.isRequired,
}
export default Store
