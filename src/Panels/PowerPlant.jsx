import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container } from 'react-reflex-grid'

import { ReactorSetStartEnergy, ReactorLevelChangeTimer } from '../Redux/ActionCreator'
import {
  CstReactor, CstText,
} from '../Cst'

import ControlPanel from './ControlPanel'
import ReactorPanel from './ReactorPanel'
import TurbinePanel from './TurbinePanel'
import SteamPanel from './SteamPanel'
import RecirculatePanel from './RecirculatePanel'
import GeneratorPanel from './GeneratorPanel'

const { StartEnergy } = CstReactor
const {
  ReactorTxt, TurbineTxt, SteamTxt, RecirculateTxt, GeneratorTxt,
} = CstText


const PowerPlant = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Called start reactor')
    dispatch(ReactorSetStartEnergy(StartEnergy.Power20))
    dispatch(ReactorLevelChangeTimer())
  }, [])// eslint-disable-line

  return (
    <Container full className="Powerplant">

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

export default PowerPlant
