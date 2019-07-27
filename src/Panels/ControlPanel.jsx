import React from 'react'
import PropTypes from 'prop-types'

import { Container, Row, Col } from 'react-reflex-grid'
import Display from '../Components/ControlElements/Display'


const ControlPanel = ({
  Name, StatusStatus, ErrorMsg, children,
}) => (
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
  StatusStatus: PropTypes.string.isRequired,
  ErrorMsg: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

ControlPanel.defaultProps = {
  ErrorMsg: false,
}

export default ControlPanel
