import React, { useContext } from 'react'
import { Col, Row } from 'react-reflex-grid'

import { AppContext } from '../Redux/Store'
import { CstText } from '../Cst'

import Display from '../Components/ControlElements/Display'

const { GeneratorTxt } = CstText


const GeneratorPanel = () => {
  const { state } = useContext(AppContext)
  const { GeneratorPower } = state

  return (
    <React.Fragment>
      <Row>
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
