import React, { useEffect, useContext } from 'react'

import { Container } from 'react-reflex-grid'
import { AppContext } from '../Redux/Store'

import { ReactorSetStartEnergy } from '../Redux/ActionCreator'
import {
  CstReactor, CstText,
} from '../Cst'

import ControlPanel from './ControlPanel'
import EnergyPanel from './EnergyPanel'
import TurbinePanel from './TurbinePanel'
import SteamPanel from './SteamPanel'
import RecirculatePanel from './RecirculatePanel'
import GeneratorPanel from './GeneratorPanel'

const { StartEnergy } = CstReactor
const {
  ReactorTxt, TurbineTxt, SteamTxt, RecirculateTxt, GeneratorTxt,
} = CstText


const PowerPlant = () => {
  const { state, dispatch } = useContext(AppContext)


  useEffect(() => {
    console.log('Called start reactor')
    ReactorSetStartEnergy(StartEnergy.Power20, state, dispatch)
  }, [])// eslint-disable-line

  return (
    <Container full className="Powerplant">

      <ControlPanel Name={ReactorTxt.Title} StatusStatus="">
        <EnergyPanel />
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

export default PowerPlant
