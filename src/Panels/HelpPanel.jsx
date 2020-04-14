import React from 'react'
import { Row, Col } from 'react-reflex-grid'

import { CstText } from '../Cst'

const { WelcomeTxt } = CstText

const HelpPanel = () => (
  <Row>
    <Col auto>
      <div className="subtitel">{WelcomeTxt.HelpScreenLink}</div>
    </Col>
  </Row>

)

export default HelpPanel
