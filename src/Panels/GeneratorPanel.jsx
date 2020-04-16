import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-reflex-grid'

import { CstText } from '../Cst'
import { GeneratorChangeBreaker } from '../Redux/ActionsTurbine'

import Display from '../Components/ControlElements/Display'
import Button from '../Components/ControlElements/Button'

const { GeneratorTxt } = CstText


const GeneratorPanel = () => {
  const dispatch = useDispatch()
  const { GeneratorPower, GeneratorBreaker } = useSelector((state) => ({
    GeneratorPower: state.GeneratorPower,
    GeneratorBreaker: state.GeneratorBreaker,
  }))

  return (
    <React.Fragment>
      <Row>
        <Col size={1}>
          <span className="subtitle">{GeneratorTxt.Breaker}</span>
          <Button
            Caption={GeneratorBreaker ? GeneratorTxt.Closed : GeneratorTxt.Open}
            SetPressed={GeneratorBreaker}
            Color="Red"
            TextColor="yellow"
            cb={() => dispatch(GeneratorChangeBreaker())}
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
