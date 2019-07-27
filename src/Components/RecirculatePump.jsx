import React, { useContext } from 'react'
import PropTypes from 'prop-types'

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
    <div className="d-flex flex-column">
      {/* Title */}
      <span className="title">{Title}</span>
      <div className="d-flex flex-row justify-content-start align-items-center text-align-left">
        {/* Pump valves */}
        <div className="d-flex flex-column m-2">
          <span className="text">{RecirculateTxt.Valves}</span>
          <Button
            Caption={RecirculateTxt.CstIntakeValve}
            Color="SlateGrey "
            TextColor="white"
            cb={() => SetValve(CstIntakeValve)}
            Width={80}
            SetPressed={ValvePosition(CstIntakeValve)}
          />
          <Button
            Caption={RecirculateTxt.CstOutputValve}
            Color="SlateGrey "
            TextColor="white"
            cb={() => SetValve(CstOutputValve)}
            Width={80}
            SetPressed={ValvePosition(CstOutputValve)}
          />
        </div>
        {/*  Pump level */}
        <div className="d-flex flex-column m-2">
          <span className="text">{RecirculateTxt.Level}</span>
          <div className="d-flex flex-row">
            <div className="m-2">
              <Selector
                Amount={5}
                Radius={50}
                cb={set => SetPump(PumpName, set - 1, state, dispatch)}
              />
            </div>
            <div className="m-2">
              {/* setting labels */}
              <div className="d-flex flex-column">
                <span className="text"> Off</span>
                <span className="text"> 25 %</span>
                <span className="text"> 50 %</span>
                <span className="text"> 75 %</span>
                <span className="text"> 100 %</span>
              </div>
            </div>
          </div>
        </div>
        {/* Pump Flow */}
        <div className="d-flex flex-colum">
          <span className="text">{RecirculateTxt.Flow}</span>
          <Display Text={(Flows[PumpName]).toLocaleString()} Width={75} />
        </div>
      </div>
    </div>
  )
}

RecirculatePump.propTypes = {
  PumpName: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
}

export default RecirculatePump
