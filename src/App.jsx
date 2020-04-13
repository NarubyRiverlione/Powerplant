import React from 'react'

import './App.css'
import PowerPanel from './Panels/PowerPlant'

import Store from './Redux/Store'
import { CstText } from './Cst'

function App() {
  return (
    <>
      <header>{CstText.Title}</header>

      <main>
        <Store>
          <PowerPanel />
        </Store>
      </main>

    </>
  )
}

export default App
