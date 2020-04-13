import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-reflex-grid'

import { CstText } from '../Cst'
import { PressureBar } from '../Redux/CalcSteam'

import Display from '../Components/ControlElements/Display'
import Button from '../Components/ControlElements/Button'

import { ToggleMSIV } from '../Redux/ActionCreator'

const { SteamTxt } = CstText


const SteamPanel = () => {
  const dispatch = useDispatch()
  const { SteamTemp, SteamPressure, MSIV } = useSelector((state) => ({
    SteamTemp: state.SteamTemp,
    SteamPressure: state.SteamPressure,
    MSIV: state.MSIV,
  }))

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
            cb={() => dispatch(ToggleMSIV())}
          />

        </Col>

      </Row>
    </React.Fragment>
  )
}

export default SteamPanel
