import React, { useEffect, useContext } from 'react'

import { AppContext } from '../Redux/Store'

import { ReactorSetStartEnergy } from '../Redux/ActionCreator'
import { CstReactor, CstText } from '../Cst'

import ControlPanel from './ControlPanel'
import EnergyPanel from './EnergyPanel'
import TurbinePanel from './TurbinePanel'
import SteamPanel from './SteamPanel'
import RecirculatePanel from './RecirculatePanel'

const { StartEnergy } = CstReactor
const {
  ReactorTxt, TurbineTxt, SteamTxt, RecirculateTxt,
} = CstText


const PowerPlant = () => {
  const { state, dispatch } = useContext(AppContext)


  useEffect(() => {
    console.log('Called start reactor')
    ReactorSetStartEnergy(StartEnergy.Power100, state, dispatch)
  }, [])// eslint-disable-line


  return (
    <div className="Powerplant">

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


    </div>
  )
}

export default PowerPlant
