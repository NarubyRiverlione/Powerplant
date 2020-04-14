import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { CstNavScreens } from '../Cst'
import PowerPlantScreen from './PowerPlantScreen'
import StartScreen from './StartScreen'

const Navigator = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={CstNavScreens.StartScreen}>
        <StartScreen />
      </Route>
      <Route path={CstNavScreens.PowerplantScreen}>
        <PowerPlantScreen />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default Navigator
