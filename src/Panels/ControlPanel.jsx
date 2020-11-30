import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Collapse from 'react-css-collapse'

import { Container, Row, Col } from 'react-reflex-grid'
import Display from '../Components/ControlElements/Display'
import Screw from '../Components/ControlElements/Srew'

const screwSize = 10

const ControlPanel = ({ Name, Status, children }) => {
  const [isOpen, setOpen] = useState(true)

  return (
    <Container full className="ControlPanel">
      <Row>
        <Col size={1} className="screwLeft">
          <Screw Width={screwSize} />
        </Col>
        <Col auto>    </Col>
        <Col size={1} className="screwRight">
          <Screw Width={screwSize} />
        </Col>
      </Row>

      <Row>
        <Col auto className="InnerPanel" id={`${Name} panel`}>
          <Row>
            <Col auto className="PanelHeader">
              <span
                onClick={() => { setOpen(!isOpen) }}
                onKeyDown={() => { setOpen(!isOpen) }}
                role="button"
                tabIndex={0}
                style={{ marginRight: screwSize }}
              >
                {Name}
              </span>
            </Col>
            <Col size={6}>
              <Display
                Width={500}
                Text={Status}
              />
            </Col>
          </Row>

          <Collapse isOpen={isOpen}>
            <Row>
              <Col auto className="PanelContent">
                {children}
              </Col>
            </Row>
          </Collapse>
        </Col>
      </Row>

      <Row>
        <Col size={1} className="screwLeft">
          <Screw Width={screwSize} />
        </Col>
        <Col auto>    </Col>
        <Col size={1} className="screwRight">
          <Screw Width={screwSize} />
        </Col>
      </Row>
    </Container>
  )
}

ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  Status: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ControlPanel.defaultProps = {
  Status: '',
}

export default ControlPanel
