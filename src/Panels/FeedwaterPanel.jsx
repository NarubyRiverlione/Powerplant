import React from 'react'
import { Col, Row } from 'react-reflex-grid'

import Pump from '../Components/Pump'
import { CstPumps, CstText } from '../Cst'


const FeedwaterPanel = () => (
  <React.Fragment>
    <Row>
      <Col size={6} md>
        <Pump PumpName={CstPumps.FeedwaterPump1} Title={CstText.FeedwaterTxt.Pump1} />
      </Col>
      <Col size={6} md>
        <Pump PumpName={CstPumps.FeedwaterPump2} Title={CstText.FeedwaterTxt.Pump2} />
      </Col>
    </Row>
  </React.Fragment>
)


export default FeedwaterPanel
