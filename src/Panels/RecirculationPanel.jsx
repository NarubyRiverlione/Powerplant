import React from 'react'
import { Col, Row } from 'react-reflex-grid'

import Pump from '../Components/Pump'
import { CstPumps, CstText } from '../Cst'
import SteamPanel from './SteamPanel'

const { RecirculationTxt } = CstText

const RecirculationPanel = () => (
  <React.Fragment>
    <Row>
      <Col size={5} md>
        <Row>
          <Col auto>
            <div className="title">{RecirculationTxt.CircuitLeft}</div>
          </Col>
        </Row>

        <Row>
          <Col auto>
            <Pump PumpName={CstPumps.RecircLeftA} Title={RecirculationTxt.PumpLA} />
          </Col>
          <Col auto>
            <Pump PumpName={CstPumps.RecircLeftB} Title={RecirculationTxt.PumpLB} />
          </Col>

        </Row>
      </Col>

      <Col size={2} md>
        <Row>
          <Col auto>
            <div className="title">{RecirculationTxt.Steamdrum}</div>
          </Col>
        </Row>

        <SteamPanel />

      </Col>

      <Col size={5} md>
        <Row>
          <Col auto>
            <div className="title">{RecirculationTxt.CircuitRight}</div>
          </Col>
        </Row>

        <Row>
          <Col auto>
            <Pump PumpName={CstPumps.RecircRightA} Title={RecirculationTxt.PumpRA} />
          </Col>
          <Col auto>
            <Pump PumpName={CstPumps.RecircRightB} Title={RecirculationTxt.PumpRB} />
          </Col>

        </Row>
      </Col>
    </Row>
  </React.Fragment>
)


export default RecirculationPanel
