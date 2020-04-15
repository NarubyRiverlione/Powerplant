import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container } from 'react-reflex-grid'


import { ReactorLevelChangeTimer } from '../Redux/ActionCreator'
import { CstText } from '../Cst'

import SimControlsPanel from '../Panels/SimControlsPanel'
import ControlPanel from '../Panels/ControlPanel'
import ReactorPanel from '../Panels/ReactorPanel'
import TurbinePanel from '../Panels/TurbinePanel'
import SteamPanel from '../Panels/SteamPanel'
import FeedwaterPanel from '../Panels/FeedwaterPanel'
import GeneratorPanel from '../Panels/GeneratorPanel'


const {
  ReactorTxt, TurbineTxt, SteamTxt, FeedwaterTxt, GeneratorTxt,
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


      <ControlPanel Name={FeedwaterTxt.Title} StatusStatus="">
        <FeedwaterPanel />
      </ControlPanel>

      <ControlPanel Name={SteamTxt.Title} StatusStatus="">
        <SteamPanel />
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
