import React, { useContext } from 'react'

import { AppContext } from '../Redux/Store'
import { CstText } from '../Cst'
import { PressureBar } from '../Redux/CalcPressure'

import Display from '../Components/ControlElements/Display'
import Button from '../Components/ControlElements/Button'

import { ToggleMSIV } from '../Redux/ActionCreator'

const { SteamTxt } = CstText


const SteamPanel = () => {
  const { state, dispatch } = useContext(AppContext)
  const { SteamTemp, SteamPressure, MSIV } = state

  return (
    <div className="d-flex flex-row justify-content-around">
      <div className="d-flex flex-column justify-content-center align-items-end m-2">
        <Display
          Title={SteamTxt.Temp}
          Text={SteamTemp.toLocaleString(undefined, { maximumFractionDigits: 1 })}
          Width={70}
          Suffix={`${SteamTxt.TempUnit} `} // add space for align pressure display
        />
        <Display
          Title={SteamTxt.Pressure}
          Text={PressureBar(SteamPressure).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          Width={70}
          Suffix={SteamTxt.PressureUnit}
        />
      </div>
      <div className="d-flex flex-row justify-content-center m-2">
        <div className="d-flex flex-column align-items-center">
          <span className="title">{SteamTxt.MSIV}</span>
          <Button
            Caption="MSIV"
            Color="green"
            TextColor="white"
            SetPressed={MSIV}
            cb={() => ToggleMSIV(dispatch)}
          />
        </div>
      </div>
    </div>
  )
}

export default SteamPanel
