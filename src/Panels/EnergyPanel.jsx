import React, { useContext } from 'react'

import { AppContext } from '../Redux/Store'
import { ReactorChangeEnergy } from '../Redux/ActionCreator'

import Display from '../Components/ControlElements/Display'
import Button from '../Components/ControlElements/Button'
import { UnitConversion, CstText } from '../Cst'

const { ReactorTxt } = CstText
const EnergyPanel = () => {
  const {
    Energy, ReactorTemp, ReactorPressure, dispatch,
  } = useContext(AppContext)


  const ButtonPressed = (EnergyChange) => {
    ReactorChangeEnergy(EnergyChange, dispatch)
  }

  const PressureBar = ReactorPressure / UnitConversion.Pressure_mmHG_Bar

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-row justify-content-around">
        <Display
          Title={ReactorTxt.Energy}
          Text={Energy.toLocaleString('nl-BE', { maximumFractionDigits: 2 })}
          Width={120}
        />
        <Display
          Title={ReactorTxt.Temp}
          Text={ReactorTemp.toLocaleString('nl-BE', { maximumFractionDigits: 1 })}
          Width={70}
          Suffix={ReactorTxt.TempUnit}
        />
        <Display
          Title={ReactorTxt.Pressure}
          Text={PressureBar.toLocaleString('nl-BE', { maximumFractionDigits: 2 })}
          Width={70}
          Suffix={ReactorTxt.PressureUnit}
        />
      </div>
      <div className="d-flex flex-row">
        <div style={{ marginRight: 5 }} className="d-flex flex-row">
          <Button
            Caption="+10"
            Color="SteelBlue"
            TextColor="FloralWhite "
            cb={() => ButtonPressed(10)}
          />
          <Button
            Caption="+5"
            Color="SteelBlue"
            TextColor="FloralWhite "
            cb={() => ButtonPressed(5)}
          />
          <Button
            Caption="+"
            Color="SteelBlue"
            TextColor="FloralWhite "
            cb={() => ButtonPressed(1)}
          />
        </div>
        <div style={{ marginLeft: 5 }} className="d-flex flex-row">
          <Button
            Caption="-"
            Color="SteelBlue"
            TextColor="white"
            cb={() => ButtonPressed(-1)}
          />
          <Button
            Caption="-5"
            Color="SteelBlue"
            TextColor="FloralWhite "
            cb={() => ButtonPressed(-5)}
          />
          <Button
            Caption="-10"
            Color="SteelBlue"
            TextColor="FloralWhite "
            cb={() => ButtonPressed(-10)}
          />
        </div>
      </div>
    </div>
  )
}

export default EnergyPanel
