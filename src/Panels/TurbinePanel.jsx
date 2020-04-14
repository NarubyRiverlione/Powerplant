import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-reflex-grid'

import { CstText } from '../Cst'
import { TurbineChangeSetpoint, TurbineSetRollup } from '../Redux/ActionCreator'

import Display from '../Components/ControlElements/Display'
import ReactorButton from '../Components/ReactorButton'
import Button from '../Components/ControlElements/Button'

const { TurbineTxt } = CstText

const TurbinePanel = () => {
  const dispatch = useDispatch()
  const {
    BypassValve, TurbineSpeed, SteamFlow, TurbineSetpoint, TurbineRollup,
  } = useSelector((state) => ({
    BypassValve: state.BypassValve,
    TurbineSpeed: state.TurbineSpeed,
    SteamFlow: state.SteamFlow,
    TurbineSetpoint: state.TurbineSetpoint,
    TurbineRollup: state.TurbineRollup,
  }))


  return (
    <React.Fragment>

      <Row>
        <Col auto xl>
          <Row>
            {/* Steam Flow */}
            <Col auto>
              <Row><Col auto><span className="subtitel">{TurbineTxt.SteamFlow}</span></Col></Row>
              <Row>
                <Display
                  Text={SteamFlow.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                  Width={50}
                  Suffix={TurbineTxt.SteamFlowUnit}
                />

              </Row>
            </Col>

            {/* Bypass Valve */}
            <Col auto>
              <Row><Col auto><span className="subtitel">{TurbineTxt.BypassValve}</span></Col></Row>
              <Row>
                <Display
                  Text={BypassValve.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  Width={70}
                  Suffix="%"
                />

              </Row>
            </Col>
          </Row>
        </Col>

        {/* Turbine Setpoint */}
        <Col auto xl>
          <Row className="justify-center"><span className="subtitel ">{TurbineTxt.Setpoint}</span></Row>
          <Row className="justify-start">
            <Col size={6}>
              <Display
                Text={TurbineSetpoint.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                Width={50}
                Suffix={TurbineTxt.SteamFlowUnit}
              />
            </Col>
            <Col size={3}>
              <ReactorButton Step={1} cb={() => dispatch(TurbineChangeSetpoint(1))} />
            </Col>
            <Col size={3}>
              <ReactorButton Step={-1} cb={() => dispatch(TurbineChangeSetpoint(-1))} />
            </Col>
          </Row>

          {/* Turbine Rollup */}
          <Row className="justify-center"><span className="subtitel">{TurbineTxt.Rollup}</span></Row>
          <Row>
            <Col auto>
              <Button
                Caption={TurbineTxt.RollupOff}
                Color="SlateGrey "
                TextColor="white"
                SetPressed={TurbineRollup === 0}
                cb={() => dispatch(TurbineSetRollup(0))}
              />
            </Col>
            <Col auto>
              <Button
                Caption={TurbineTxt.Rollup900}
                Color="SlateGrey "
                TextColor="white"
                SetPressed={TurbineRollup === 900}
                cb={() => dispatch(TurbineSetRollup(900))}
              />
            </Col>
            <Col auto>
              <Button
                Caption={TurbineTxt.Rollup1800}
                Color="SlateGrey "
                TextColor="white"
                SetPressed={TurbineRollup === 1800}
                cb={() => dispatch(TurbineSetRollup(1800))}
              />
            </Col>
          </Row>
        </Col>

        {/* Turbine Speed */}
        <Col auto>
          <Row><Col auto><span className="subtitel">{TurbineTxt.Speed}</span></Col></Row>
          <Row><Display Text={TurbineSpeed.toLocaleString(undefined, { maximumFractionDigits: 0 })} Width={100} Suffix="RPM" /></Row>
        </Col>
      </Row>


    </React.Fragment>
  )
}

export default TurbinePanel
