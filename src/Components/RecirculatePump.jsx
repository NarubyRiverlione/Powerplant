import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Col, Row } from 'react-reflex-grid'

import Selector from './ControlElements/Selector'
import { SetPump, ToggleValve } from '../Redux/ActionCreator'
import Button from './ControlElements/Button'
import {
  CstText, CstIntakeValve, CstOutputValve,
} from '../Cst'
import Display from './ControlElements/Display'

const { RecirculateTxt } = CstText


const RecirculatePump = ({ PumpName, Title }) => {
  const dispatch = useDispatch()
  const { Valves, Flows, Pumps } = useSelector((state) => ({
    Valves: state.Valves,
    Flows: state.Flows,
    Pumps: state.Pumps,
  }))

  const ValveName = (valveSuffix) => `${PumpName}_${valveSuffix}`
  const ValvePosition = (valveSuffix) => Valves[ValveName(valveSuffix)]

  const SetValve = (valveSuffix) => {
    dispatch(ToggleValve(ValveName(valveSuffix), PumpName))
  }
  const PumpLevel = Pumps[PumpName] * 4 + 1
  // console.log(`${PumpName}: ${PumpLevel}`)
  return (
    <React.Fragment>
      <Row justify-center>
        {/* Title */}
        <span className="title">{Title}</span>
      </Row>
      <Row justify-center>
        {/* Pump valves */}
        <Col size={3} sm>
          <Row justify-center>
            <span className="subtitel">{RecirculateTxt.Valves}</span>
          </Row>
          <Row justify-center>
            <Col auto>
              <Button
                Caption={RecirculateTxt.CstIntakeValve}
                Color="SlateGrey "
                TextColor="white"
                cb={() => SetValve(CstIntakeValve)}
                Width={80}
                SetPressed={ValvePosition(CstIntakeValve)}
              />
            </Col>
          </Row>
          <Row justify-center>
            <Col auto>
              <Button
                Caption={RecirculateTxt.CstOutputValve}
                Color="SlateGrey "
                TextColor="white"
                cb={() => SetValve(CstOutputValve)}
                Width={80}
                SetPressed={ValvePosition(CstOutputValve)}
              />
            </Col>
          </Row>

        </Col>

        {/*  Pump level */}
        <Col size={6} sm>
          <Row justify-center><span className="subtitel">{RecirculateTxt.Level}</span></Row>
          <Row>
            <Col auto>
              <br />
              <Selector
                Amount={5}
                Radius={50}
                cb={(set) => dispatch(SetPump(PumpName, set - 1))}
                OverwriteSelected={PumpLevel}
              />

            </Col>
            <Col auto className="">
              {/* setting labels */}

              <Row><Col auto className="RecircLabels"><span className="text"> Off</span></Col></Row>
              <Row><Col auto><span className="text"> 25 %</span></Col></Row>
              <Row><Col auto><span className="text"> 50 %</span></Col></Row>
              <Row><Col auto><span className="text"> 75 %</span></Col></Row>
              <Row><Col auto><span className="text"> 100 %</span></Col></Row>

            </Col>

          </Row>
        </Col>

        {/* Pump Flow */}
        <Col size={3} sm>
          <Row justify-center>
            <span className="subtitel">{RecirculateTxt.Flow}</span>
          </Row>
          <Row>
            <Col auto><Display Text={(Flows[PumpName]).toLocaleString()} Width={75} /></Col>
          </Row>
        </Col>

      </Row>
    </React.Fragment>
  )
}

RecirculatePump.propTypes = {
  PumpName: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
}

export default RecirculatePump
