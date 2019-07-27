import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-reflex-grid'

import { AppContext } from '../Redux/Store'
import Selector from './ControlElements/Selector'
import { SetPump, ToggleValve } from '../Redux/ActionCreator'
import Button from './ControlElements/Button'
import {
  CstText, CstIntakeValve, CstOutputValve,
} from '../Cst'
import Display from './ControlElements/Display'

const { RecirculateTxt } = CstText


const RecirculatePump = ({ PumpName, Title }) => {
  const { dispatch, state } = useContext(AppContext)
  const { Valves, Flows } = state

  const ValveName = valveSuffix => `${PumpName}_${valveSuffix}`
  const ValvePosition = valveSuffix => Valves[ValveName(valveSuffix)]

  const SetValve = (valveSuffix) => {
    ToggleValve(ValveName(valveSuffix), PumpName, state, dispatch)
  }

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
            <Button
              Caption={RecirculateTxt.CstIntakeValve}
              Color="SlateGrey "
              TextColor="white"
              cb={() => SetValve(CstIntakeValve)}
              Width={80}
              SetPressed={ValvePosition(CstIntakeValve)}
            />
          </Row>
          <Row justify-center>
            <Button
              Caption={RecirculateTxt.CstOutputValve}
              Color="SlateGrey "
              TextColor="white"
              cb={() => SetValve(CstOutputValve)}
              Width={80}
              SetPressed={ValvePosition(CstOutputValve)}
            />
          </Row>

        </Col>

        {/*  Pump level */}
        <Col size={6} sm>
          <Row justify-center><span className="subtitel">{RecirculateTxt.Level}</span></Row>
          <Row>
            <Col auto>
              <div>
                <Selector
                  Amount={5}
                  Radius={50}
                  cb={set => SetPump(PumpName, set - 1, state, dispatch)}
                />
              </div>
            </Col>
            <Col auto>
              {/* setting labels */}
              <Row direction-column>
                <Col auto><span className="text"> Off</span></Col>
                <Col auto><span className="text"> 25 %</span></Col>
                <Col auto><span className="text"> 50 %</span></Col>
                <Col auto><span className="text"> 75 %</span></Col>
                <Col auto><span className="text"> 100 %</span></Col>
              </Row>
            </Col>

          </Row>
        </Col>

        {/* Pump Flow */}
        <Col size={3} sm>
          <Row justify-center>
            <span className="subtitel">{RecirculateTxt.Flow}</span>
          </Row>
          <Row>
            <Display Text={(Flows[PumpName]).toLocaleString()} Width={75} />
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
