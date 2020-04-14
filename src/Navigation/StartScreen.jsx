import React from 'react'
import { Container } from 'react-reflex-grid'

import ControlPanel from '../Panels/ControlPanel'
import StartupChoicesPanel from '../Panels/StartupChoicesPanel'
import HelpPanel from '../Panels/HelpPanel'
import { CstText } from '../Cst'

const { WelcomeTxt } = CstText

const StartScreen = () => (
  <Container full className="Powerplant">

    <ControlPanel Name={WelcomeTxt.StartupScenarios} Status={WelcomeTxt.ChoiceStartup}>
      <StartupChoicesPanel />
    </ControlPanel>

    <ControlPanel Name={WelcomeTxt.HelpScreenTitle}>
      <HelpPanel />
    </ControlPanel>

  </Container>
)

export default StartScreen
