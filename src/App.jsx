import React from 'react'

import './App.css'
import PowerPanel from './Panels/PowerPlant'

import Store from './Redux/Store'
import { CstText } from './Cst'

function App() {
  return (
    <React.Fragment>
      <header>{CstText.Title}</header>

      <main>
        <Store>
          <PowerPanel />
        </Store>
      </main>

    </React.Fragment>
  )
}

export default App
