import React from 'react'
import { Container } from 'react-reflex-grid'
import './App.css'
import PowerPanel from './Panels/PowerPlant'

import Store from './Redux/Store'
import { CstText } from './Cst'

function App() {
  return (
    <Container fluid>
      <header>
        <h1>{CstText.Title}</h1>
      </header>

      <main>
        <Store>
          <PowerPanel />
        </Store>
      </main>

    </Container>
  )
}

export default App
