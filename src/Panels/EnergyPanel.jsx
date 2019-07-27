import React, { useContext } from 'react'

import { AppContext } from '../Redux/Store'
import { ReactorChangeEnergy } from '../Redux/ActionCreator'

import Display from '../Components/ControlElements/Display'
import { CstText } from '../Cst'
import ReactorButton from '../Components/ReactorButton'

const { ReactorTxt } = CstText
const EnergyPanel = () => {
  const { state, dispatch } = useContext(AppContext)
  const { Energy, ReactorTemp } = state

  const ButtonPressed = (EnergyChange) => {
    ReactorChangeEnergy(EnergyChange, state, dispatch)
  }


  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row justify-content-around m-2">
        <Display
          Title={ReactorTxt.Energy}
          Text={Energy.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          Width={120}
        />
        <Display
          Title={ReactorTxt.Temp}
          Text={ReactorTemp.toLocaleString(undefined, { maximumFractionDigits: 1 })}
          Width={70}
          Suffix={ReactorTxt.TempUnit}
        />
      </div>
      <div className="d-flex flex-row justify-content-around m-2">
        <ReactorButton Step={10} cb={() => ButtonPressed(10)} />
        <ReactorButton Step={5} cb={() => ButtonPressed(5)} />
        <ReactorButton Step={1} cb={() => ButtonPressed(1)} />
        <ReactorButton Step={-1} cb={() => ButtonPressed(-1)} />
        <ReactorButton Step={-5} cb={() => ButtonPressed(-5)} />
        <ReactorButton Step={-10} cb={() => ButtonPressed(-10)} />
      </div>
    </div>
  )
}

export default EnergyPanel
