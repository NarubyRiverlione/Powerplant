import React from 'react'
import { Row, Col } from 'react-reflex-grid'
import { useHistory } from 'react-router-dom'
import { CstText, CstNavScreens } from '../Cst'
import Button from '../Components/ControlElements/Button'

const { SimControlsTxt } = CstText

const SimControlsPanel = () => {
  const history = useHistory()

  return (

    <Row className="ControlPanel">
      <Col size={4}>
        <Button
          Caption={SimControlsTxt.ReturnBtn}
          Width={300}
          Color="Red"
          TextColor="Yellow"
          cb={() => { history.replace(CstNavScreens.StartScreen) }}
        />
      </Col>

      <Col auto>
        <div className="PanelHeader">{CstText.Title}</div>
      </Col>
    </Row>

  )
}

export default SimControlsPanel
