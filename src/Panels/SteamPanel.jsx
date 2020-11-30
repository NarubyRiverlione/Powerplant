import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'react-reflex-grid'

import { CstText } from '../Cst'
import { PressureBar } from '../Redux/CalcSteam'

import Display from '../Components/ControlElements/Display'

const { RecirculationTxt: SteamTxt } = CstText

const SteamPanel = () => {
  const { SteamTemp, SteamPressure, SteamFlow } = useSelector((state) => ({
    SteamTemp: state.SteamTemp,
    SteamPressure: state.SteamPressure,
    SteamFlow: state.SteamFlow,
  }))

  return (
    <React.Fragment>
      <Row>
        <Col size={4}>
          <div className="text">
            {SteamTxt.Temp}
          </div>
        </Col>

        <Col auto>
          <Display
            Text={SteamTemp.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            Width={70}
            Suffix={`${SteamTxt.TempUnit} `} // add space for align pressure display
          />
        </Col>
      </Row>

      <Row>
        <Col size={4}>
          <div className="text">
            {SteamTxt.Pressure}
          </div>
        </Col>

        <Col auto>
          <Display
            Text={PressureBar(SteamPressure).toLocaleString(undefined, { maximumFractionDigits: 2 })}
            Width={70}
            Suffix={SteamTxt.PressureUnit}
          />
        </Col>
      </Row>

      <Row>
        <Col size={2}>
          <div className="text">
            {SteamTxt.SteamFlow}
          </div>
        </Col>

        <Col auto>
          <Display
            Text={SteamFlow.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            Width={70}
            Suffix={SteamTxt.SteamFlowUnit}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default SteamPanel
