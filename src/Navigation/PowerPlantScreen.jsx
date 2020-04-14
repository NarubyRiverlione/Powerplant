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
import RecirculatePanel from '../Panels/RecirculatePanel'
import GeneratorPanel from '../Panels/GeneratorPanel'

// const { StartEnergy } = CstReactor
const {
  ReactorTxt, TurbineTxt, SteamTxt, RecirculateTxt, GeneratorTxt,
} = CstText


const PowerPlantScreen = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('Called start reactor')
    // dispatch(ReactorSetStartEnergy(StartEnergy.Power20))
    dispatch(ReactorLevelChangeTimer())
  }, [])// eslint-disable-line

  return (
    <Container full className="Powerplant">

      <SimControlsPanel />

      <ControlPanel Name={ReactorTxt.Title} StatusStatus="">
        <ReactorPanel />
      </ControlPanel>


      <ControlPanel Name={RecirculateTxt.Title} StatusStatus="">
        <RecirculatePanel />
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
