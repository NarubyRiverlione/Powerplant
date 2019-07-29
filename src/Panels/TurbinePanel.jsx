import React, { useContext } from 'react'
import { Row, Col } from 'react-reflex-grid'

import { AppContext } from '../Redux/Store'
import { CstText } from '../Cst'
import { TurbineChangeSetpoint } from '../Redux/ActionCreator'

import Display from '../Components/ControlElements/Display'
import ReactorButton from '../Components/ReactorButton'

const { TurbineTxt } = CstText

const TurbinePanel = () => {
  const { state, dispatch } = useContext(AppContext)
  const {
    BypassValve, TurbineSpeed, SteamFlow, TurbineSetpoint,
  } = state
  return (
    <React.Fragment>
      <Row>
        <Col auto>
          <Row>
            <Col auto xl>
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

            <Col auto xl>
              <Row>
                <Col auto>
                  <Display Text={TurbineSetpoint.toLocaleString(undefined, { maximumFractionDigits: 0 })} Width={50} Suffix={TurbineTxt.SteamFlowUnit} />
                </Col>
                <Col auto>
                  <ReactorButton Step={1} cb={() => TurbineChangeSetpoint(1, state, dispatch)} />
                </Col>
                <Col auto>
                  <ReactorButton Step={-1} cb={() => TurbineChangeSetpoint(-1, state, dispatch)} />
                </Col>
              </Row>

              <Row>
                <Display Title={TurbineTxt.Speed} Text={TurbineSpeed.toLocaleString(undefined, { maximumFractionDigits: 0 })} Width={100} Suffix="RPM" />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default TurbinePanel
