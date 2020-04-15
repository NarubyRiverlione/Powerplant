import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Col, Row } from 'react-reflex-grid'

// import Selector from './ControlElements/Selector'
import { SetPump, ToggleValve } from '../Redux/ActionCreator'
import Button from './ControlElements/Button'
import {
  CstText, CstIntakeValve, CstOutputValve,
} from '../Cst'
import Display from './ControlElements/Display'

const { FeedwaterTxt } = CstText


const FeedwaterPump = ({ PumpName, Title }) => {
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

  return (
    <React.Fragment>
      <Row justify-center>
        {/* Title */}
        <span className="title">{Title}</span>
      </Row>

      {/* Intake valve */}
      <Row justify-center>
        <Col size={3} sm>
          <Button
            Caption={FeedwaterTxt.CstIntakeValve}
            // Color="SlateGrey "
            // TextColor="white"
            cb={() => SetValve(CstIntakeValve)}
            Width={80}
            SetPressed={ValvePosition(CstIntakeValve)}
          />
        </Col>
        <Col size={2} sm>
          <Display
            Text={Flows[`${PumpName}_${CstIntakeValve}`].toLocaleString()}
            Width={50}
            Suffix="%"
          />
        </Col>
      </Row>

      {/*  Pump  */}
      <Row justify-center>
        <Col size={3} sm>
          <Button
            Caption="Pump"
            // Color="SlateGrey "
            // TextColor="white"
            cb={() => dispatch(SetPump(PumpName))}
            Width={80}
            SetPressed={Pumps[PumpName]}
          />
        </Col>
        <Col size={2} sm>
          <Display Text={(Flows[PumpName]).toLocaleString()} Width={50} Suffix="%" />
        </Col>
      </Row>


      {/* Output valve  */}
      <Row justify-center>
        <Col size={3} sm>
          <Button
            Caption={FeedwaterTxt.CstOutputValve}
            // Color="SlateGrey "
            // TextColor="white"
            cb={() => SetValve(CstOutputValve)}
            Width={80}
            SetPressed={ValvePosition(CstOutputValve)}
          />
        </Col>
        <Col size={2} sm>
          <Display
            Text={Flows[`${PumpName}_${CstOutputValve}`].toLocaleString()}
            Width={50}
            Suffix="%"
          />
        </Col>
      </Row>

    </React.Fragment>
  )
}

FeedwaterPump.propTypes = {
  PumpName: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
}

export default FeedwaterPump
