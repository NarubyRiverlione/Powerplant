import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Col, Row } from 'react-reflex-grid'

// import Selector from './ControlElements/Selector'
import SetPump from '../Redux/ActionsPumps'
import ToggleValve from '../Redux/ActionsValves'

import Button from './ControlElements/Button'
import { CstIntakeValve, CstOutputValve } from '../Cst'
import Display from './ControlElements/Display'


const Pump = ({ PumpName, Title }) => {
  const dispatch = useDispatch()
  const { Valves, Flows, Pumps } = useSelector((state) => ({
    Valves: state.Valves,
    Flows: state.Flows,
    Pumps: state.Pumps,
  }))

  const ValveName = (valveSuffix) => `${PumpName}_${valveSuffix}`
  const ValvePosition = (valveSuffix) => Valves[ValveName(valveSuffix)]


  return (
    <React.Fragment>
      <Row justify-center>
        {/* Title */}
        <span className="title">{Title}</span>
      </Row>

      {/* Intake valve */}
      <Row>
        <Col auto align-content-end>
          <Button
            Caption={CstIntakeValve}
            // Color="SlateGrey "
            // TextColor="white"
            cb={() => dispatch(ToggleValve(ValveName(CstIntakeValve), PumpName))}
            Width={80}
            SetPressed={ValvePosition(CstIntakeValve)}
          />
        </Col>
        <Col auto align-content-start>
          <Display
            Text={Flows[`${PumpName}_${CstIntakeValve}`].toLocaleString(undefined, { maximumFractionDigits: 0 })}
            Width={50}
            Suffix="%"
          />
        </Col>
      </Row>

      {/*  Pump  */}
      <Row justify-center>
        <Col auto>
          <Button
            Caption="Pump"
            // Color="SlateGrey "
            // TextColor="white"
            cb={() => dispatch(SetPump(PumpName))}
            Width={80}
            SetPressed={Pumps[PumpName]}
          />
        </Col>
        <Col auto>
          <Display
            Text={(Flows[PumpName]).toLocaleString(undefined, { maximumFractionDigits: 1 })}
            Width={50}
            Suffix="%"
          />
        </Col>
      </Row>


      {/* Output valve  */}
      <Row justify-center>
        <Col auto>
          <Button
            Caption={CstOutputValve}
            // Color="SlateGrey "
            // TextColor="white"
            cb={() => dispatch(ToggleValve(ValveName(CstOutputValve), PumpName))}
            Width={80}
            SetPressed={ValvePosition(CstOutputValve)}
          />
        </Col>
        <Col auto>
          <Display
            Text={Flows[`${PumpName}_${CstOutputValve}`].toLocaleString(undefined, { maximumFractionDigits: 0 })}
            Width={50}
            Suffix="%"
          />
        </Col>
      </Row>

    </React.Fragment>
  )
}

Pump.propTypes = {
  PumpName: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
}

export default Pump
