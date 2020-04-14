import React from 'react'
import { Row, Col } from 'react-reflex-grid'

import { CstText } from '../Cst'
import StartupChoice from '../Components/StartupChoice'

const { WelcomeTxt } = CstText

const StartupChoicesPanel = () => {
  const { Choices } = WelcomeTxt
  return (
    <React.Fragment>

      {Choices.map((choice) => (
        <Row key={choice.Name}>
          <Col auto>
            <StartupChoice Choice={choice} />
          </Col>
        </Row>
      ))}

    </React.Fragment>
  )
}

export default StartupChoicesPanel
