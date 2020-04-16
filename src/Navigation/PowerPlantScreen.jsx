import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container } from 'react-reflex-grid'


import { ReactorLevelChangeTimer } from '../Redux/ActionsReactor'
import { CstText } from '../Cst'

import SimControlsPanel from '../Panels/SimControlsPanel'
import ControlPanel from '../Panels/ControlPanel'
import ReactorPanel from '../Panels/ReactorPanel'
import TurbinePanel from '../Panels/TurbinePanel'
import FeedwaterPanel from '../Panels/FeedwaterPanel'
import GeneratorPanel from '../Panels/GeneratorPanel'
import RecirculationPanel from '../Panels/RecirculationPanel'


const {
  ReactorTxt, TurbineTxt, FeedwaterTxt, GeneratorTxt, RecirculationTxt,
} = CstText


const PowerPlantScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ReactorLevelChangeTimer())
  }, [])// eslint-disable-line

  return (
    <Container full className="Powerplant">

      <SimControlsPanel />

      <ControlPanel Name={ReactorTxt.Title} StatusStatus="">
        <ReactorPanel />
      </ControlPanel>


      <ControlPanel Name={RecirculationTxt.Title} StatusStatus="">
        <RecirculationPanel />
      </ControlPanel>

      <ControlPanel Name={FeedwaterTxt.Title} StatusStatus="">
        <FeedwaterPanel />
      </ControlPanel>

      <ControlPanel Name={TurbineTxt.Title} StatusStatus="">
        <TurbinePanel />
      </ControlPanel>

      <ControlPanel Name={GeneratorTxt.Title} StatusStatus="">
        <GeneratorPanel />
      </ControlPanel>

    </Container>
  )
}

export default PowerPlantScreen
