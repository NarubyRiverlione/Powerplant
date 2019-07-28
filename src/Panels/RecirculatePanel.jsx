import React from 'react'
import { Col, Row } from 'react-reflex-grid'

import RecirculatePump from '../Components/RecirculatePump'
import { CstPumps, CstText } from '../Cst'


const RecirculatePanel = () => (
  <React.Fragment>
    <Row>
      <Col size={6} md>
        <RecirculatePump PumpName={CstPumps.RecircPump1} Title={CstText.RecirculateTxt.Pump1} />
      </Col>
      <Col size={6} md>
        <RecirculatePump PumpName={CstPumps.RecircPump2} Title={CstText.RecirculateTxt.Pump2} />
      </Col>
    </Row>
  </React.Fragment>
)


export default RecirculatePanel
