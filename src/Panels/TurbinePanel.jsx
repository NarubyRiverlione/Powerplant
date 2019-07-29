import React, { useContext } from 'react'
import { Row, Col } from 'react-reflex-grid'

import { AppContext } from '../Redux/Store'
import { CstText } from '../Cst'
import Display from '../Components/ControlElements/Display'

const { TurbineTxt } = CstText

const TurbinePanel = () => {
  const { state, dispatch } = useContext(AppContext)
  const { BypassValve, TurbineSpeed, SteamFlow } = state
  return (
    <React.Fragment>
      <Row>
        <Col auto>
          <Row>
            <Col auto>
              <Row>
                <Col auto>
                  <Row><Col auto><span className="subtitel">{TurbineTxt.SteamFlow}</span></Col></Row>
                  <Row><Display Text={SteamFlow.toLocaleString(undefined, { maximumFractionDigits: 1 })} Width={50} Suffix={TurbineTxt.SteamFlowUnit} /></Row>
                </Col>
                <Col auto>
                  <Row><Col auto><span className="subtitel">{TurbineTxt.BypassValve}</span></Col></Row>
                  <Row><Display Text={BypassValve.toLocaleString(undefined, { maximumFractionDigits: 0 })} Width={70} Suffix="%" /></Row>
                </Col>
              </Row>
            </Col>

            <Col auto>
              <Row><Display Title={TurbineTxt.Speed} Text={TurbineSpeed.toLocaleString(undefined, { maximumFractionDigits: 0 })} Width={100} Suffix="RPM" /></Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default TurbinePanel
