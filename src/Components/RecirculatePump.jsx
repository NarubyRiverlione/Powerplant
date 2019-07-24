import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { AppContext } from '../Redux/Store'
import Selector from './ControlElements/Selector'
import { SetPump } from '../Redux/ActionCreator'

const RecirculatePump = ({ PumpName, Title }) => {
  const { dispatch } = useContext(AppContext)


  return (
    <div className="d-flex flex-column">
      {/* Title */}
      <span className="title">{Title}</span>
      {/*  Pump setting */}
      <div className="d-flex flex-row justify-content-start align-items-center text-align-left">
        <div className="m-2">
          <Selector
            Amount={5}
            Radius={50}
            cb={set => SetPump(PumpName, set - 1, dispatch)}
          />
        </div>
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
  )
}

RecirculatePump.propTypes = {
  PumpName: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
}

export default RecirculatePump
