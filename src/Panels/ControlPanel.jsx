import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'react-reflex-grid'


const ControlPanel = ({ Name, children }) => (
  <Container className="CardStyle" id={`${Name} panel`}>
    <Row direction-column>
      <Col auto className="CardHeader">
        <span style={{ marginRight: 10 }}>{Name}</span>
      </Col>

      <Col auto className="CardContent">
        {children}
      </Col>
    </Row>
  </Container>
)


ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default ControlPanel
