import React from 'react'

import './App.css'
import Navigator from './Navigation/Navigator'

import Store from './Redux/Store'
// import { CstText } from './Cst'

function App() {
  return (
    <React.Fragment>
      { // <header>{CstText.Title}</header>
      }

      <main>
        <Store>
          <Navigator />
        </Store>
      </main>

    </React.Fragment>
  )
}

export default App
