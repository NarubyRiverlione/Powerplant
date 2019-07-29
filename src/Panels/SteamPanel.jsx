import React, { useContext } from 'react'
import { Col, Row } from 'react-reflex-grid'

import { AppContext } from '../Redux/Store'
import { CstText } from '../Cst'
import { PressureBar } from '../Redux/CalcSteam'

import Display from '../Components/ControlElements/Display'
import Button from '../Components/ControlElements/Button'

import { ToggleMSIV } from '../Redux/ActionCreator'

const { SteamTxt } = CstText


const SteamPanel = () => {
  const { state, dispatch } = useContext(AppContext)
  const { SteamTemp, SteamPressure, MSIV } = state

  return (
    <React.Fragment>
      <Row>
        <Col auto>
          <Display
            Title={SteamTxt.Temp}
            Text={SteamTemp.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            Width={70}
            Suffix={`${SteamTxt.TempUnit} `} // add space for align pressure display
          />
        </Col>
        <Col auto>
          <Display
            Title={SteamTxt.Pressure}
            Text={PressureBar(SteamPressure).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            Width={70}
            Suffix={SteamTxt.PressureUnit}
          />
        </Col>

        <Col auto>
          <span className="title">{SteamTxt.MSIV}</span>
          <Button
            Caption="MSIV"
            Color="green"
            TextColor="white"
            SetPressed={MSIV}
            cb={() => ToggleMSIV(dispatch)}
          />

        </Col>

      </Row>
    </React.Fragment>
  )
}

export default SteamPanel
