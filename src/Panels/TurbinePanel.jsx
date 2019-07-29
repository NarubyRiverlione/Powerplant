import React, { useContext } from 'react'
import { Row, Col } from 'react-reflex-grid'

import { AppContext } from '../Redux/Store'
import { CstText } from '../Cst'
import { TurbineChangeSetpoint, TurbineSetRollup } from '../Redux/ActionCreator'

import Display from '../Components/ControlElements/Display'
import ReactorButton from '../Components/ReactorButton'
import Button from '../Components/ControlElements/Button'

const { TurbineTxt } = CstText

const TurbinePanel = () => {
  const { state, dispatch } = useContext(AppContext)
  const {
    BypassValve, TurbineSpeed, SteamFlow, TurbineSetpoint, TurbineRollup,
  } = state
  return (
    <React.Fragment>
      <Row>
        <Col auto>
          <Row>
            <Col auto xl>
              <Row>
                {/* Steam Flow */}
                <Col auto>
                  <Row><Col auto><span className="subtitel">{TurbineTxt.SteamFlow}</span></Col></Row>
                  <Row><Display Text={SteamFlow.toLocaleString(undefined, { maximumFractionDigits: 1 })} Width={50} Suffix={TurbineTxt.SteamFlowUnit} /></Row>
                </Col>
                {/* Bypass Valve */}
                <Col auto>
                  <Row><Col auto><span className="subtitel">{TurbineTxt.BypassValve}</span></Col></Row>
                  <Row><Display Text={BypassValve.toLocaleString(undefined, { maximumFractionDigits: 0 })} Width={70} Suffix="%" /></Row>
                </Col>
              </Row>
            </Col>

            <Col auto xl>
              {/* Turbine Setpoint */}
              <Row className="justify-center"><span className="subtitel ">{TurbineTxt.Setpoint}</span></Row>
              <Row>
                <Col auto>
                  <Display Text={TurbineSetpoint.toLocaleString(undefined, { maximumFractionDigits: 0 })} Width={50} Suffix={TurbineTxt.SteamFlowUnit} />
                </Col>
                <Col auto>
                  <ReactorButton Step={1} cb={() => TurbineChangeSetpoint(1, dispatch)} />
                </Col>
                <Col auto>
                  <ReactorButton Step={-1} cb={() => TurbineChangeSetpoint(-1, dispatch)} />
                </Col>
              </Row>
              {/* Turbine Rollup */}
              <Row className="justify-center"><span className="subtitel">{TurbineTxt.Rollup}</span></Row>
              <Row>
                <Col auto>
                  <Button Caption={TurbineTxt.RollupOff} Color="SlateGrey " TextColor="white" SetPressed={TurbineRollup === 0} cb={() => TurbineSetRollup(0, state, dispatch)} />
                </Col>
                <Col auto>
                  <Button Caption={TurbineTxt.Rollup900} Color="SlateGrey " TextColor="white" SetPressed={TurbineRollup === 900} cb={() => TurbineSetRollup(900, state, dispatch)} />
                </Col>
                <Col auto>
                  <Button Caption={TurbineTxt.Rollup1800} Color="SlateGrey " TextColor="white" SetPressed={TurbineRollup === 1800} cb={() => TurbineSetRollup(1800, state, dispatch)} />
                </Col>
              </Row>
            </Col>

            <Col auto>
              {/* Turbine Speed */}
              <Row><Col auto><span className="subtitel">{TurbineTxt.Speed}</span></Col></Row>
              <Row><Display Text={TurbineSpeed.toLocaleString(undefined, { maximumFractionDigits: 0 })} Width={100} Suffix="RPM" /></Row>
            </Col>
          </Row>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default TurbinePanel
