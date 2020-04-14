import React from 'react'
import { Col, Row } from 'react-reflex-grid'

import FeedwaterPump from '../Components/FeedwaterPump'
import { CstPumps, CstText } from '../Cst'


const FeedwaterPanel = () => (
  <React.Fragment>
    <Row>
      <Col size={6} md>
        <FeedwaterPump PumpName={CstPumps.FeedwaterPump1} Title={CstText.FeedwaterTxt.Pump1} />
      </Col>
      <Col size={6} md>
        <FeedwaterPump PumpName={CstPumps.FeedwaterPump2} Title={CstText.FeedwaterTxt.Pump2} />
      </Col>
    </Row>
  </React.Fragment>
)


export default FeedwaterPanel
