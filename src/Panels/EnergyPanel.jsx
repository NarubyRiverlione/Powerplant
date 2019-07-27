import React, { useContext } from 'react'

import { Col, Row, Container } from 'react-reflex-grid'
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
    <React.Fragment>
      <Row>
        <Col size={6} xs>
          <Display
            Title={ReactorTxt.Energy}
            Text={Energy.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            Width={120}
          />
        </Col>
        <Col size={6} xs>
          <Display
            Title={ReactorTxt.Temp}
            Text={ReactorTemp.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            Width={70}
            Suffix={ReactorTxt.TempUnit}
          />
        </Col>
      </Row>

      <Row>
        <Col auto md>
          <Row justify-space-around>
            <Col size={3}><ReactorButton Step={10} cb={() => ButtonPressed(10)} /></Col>
            <Col size={3}><ReactorButton Step={5} cb={() => ButtonPressed(5)} /></Col>
            <Col size={3}><ReactorButton Step={1} cb={() => ButtonPressed(1)} /></Col>
          </Row>
        </Col>
        <Col auto md>
          <Row justify-space-around>
            <Col size={3}><ReactorButton Step={-1} cb={() => ButtonPressed(-1)} /></Col>
            <Col size={3}><ReactorButton Step={-5} cb={() => ButtonPressed(-5)} /></Col>
            <Col size={3}><ReactorButton Step={-10} cb={() => ButtonPressed(-10)} /></Col>
          </Row>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default EnergyPanel
