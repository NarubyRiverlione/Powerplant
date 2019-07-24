import React, { useEffect, useContext } from 'react'

import { ReactorSetStartEnergy } from '../Redux/ActionCreator'
import EnergyPanel from './EnergyPanel'
import { AppContext } from '../Redux/Store'
import { CstReactor } from '../Cst'

const { StartEnergy } = CstReactor

const PowerPlantPanel = () => {
  const { dispatch } = useContext(AppContext)
  useEffect(() => {
    ReactorSetStartEnergy(StartEnergy.BeforeBoiling, dispatch)
  }, [dispatch])

  return (
    <React.Fragment>
      <div style={{ border: '1px solid red', flex: 2 }}>
        <EnergyPanel />
      </div>
      {/*
  <div
  style={{ border: '1px solid blue', flex: 1 }}
  className="d-flex justify-content-center align-items-center text-align-center"
  >
  OTHER
  </div>
*/}
    </React.Fragment>
  )
}

export default PowerPlantPanel
