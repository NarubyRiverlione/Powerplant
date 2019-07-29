import React, { useContext } from 'react'
import { Col, Row } from 'react-reflex-grid'

import { AppContext } from '../Redux/Store'
import { CstText } from '../Cst'
import { GeneratorChangeBreaker } from '../Redux/ActionCreator'

import Display from '../Components/ControlElements/Display'
import Button from '../Components/ControlElements/Button'

const { GeneratorTxt } = CstText


const GeneratorPanel = () => {
  const { state, dispatch } = useContext(AppContext)
  const { GeneratorPower, GeneratorBreaker } = state

  return (
    <React.Fragment>
      <Row>
        <Col size={1}>
          <span className="subtitel">{GeneratorTxt.Breaker}</span>
          <Button
            Caption={GeneratorBreaker ? GeneratorTxt.Closed : GeneratorTxt.Open}
            SetPressed={GeneratorBreaker}
            Color="Red"
            TextColor="yellow"
            cb={() => GeneratorChangeBreaker(state, dispatch)}
          />

        </Col>
        <Col auto>
          <Display
            Title={GeneratorTxt.Power}
            Text={GeneratorPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            Width={120}
            Suffix={GeneratorTxt.PowerUnit}
          />
        </Col>

      </Row>
    </React.Fragment>
  )
}

export default GeneratorPanel
