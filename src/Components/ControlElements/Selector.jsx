import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'


const cx = r => r + 5
const cy = r => r + 20

const Selector = ({
  OverwriteSelected, Side, Amount, Radius, cb,
}) => {
  const [MidX, setMidX] = useState(0)
  const [MidY, setMidY] = useState(0)
  const [Selected, setSelected] = useState(OverwriteSelected)

  const CalcSelectedNotch = useCallback(() => {
    const AngleNotch = 180.0 / (Amount + 1)
    const Align = Side === 'R' ? -1 : 1
    const AngleSelectedNotch = 90.0 + (Selected * AngleNotch * Align)
    const RadialNotch = AngleSelectedNotch * Math.PI / 180.0

    const newMidX = cx(Radius) + (Radius - 7) * Math.cos(RadialNotch) + (10 * Align)
    const newMidY = cy(Radius) - (Radius - 7) * Math.sin(RadialNotch)
    setMidX(newMidX)
    setMidY(newMidY)
  }, [Radius, Amount, Selected, Side])

  const SelectNotch = (direction) => {
    let newSelectedNotch = Selected + direction
    // max boundary
    if (newSelectedNotch > Amount) newSelectedNotch = Amount
    //  Min boundary
    if (newSelectedNotch < 1) newSelectedNotch = 1

    setSelected(newSelectedNotch)
    CalcSelectedNotch()
    // cb will change prop Selected
    if (cb && newSelectedNotch !== Selected) { cb(newSelectedNotch) }
  }

  useEffect(() => { CalcSelectedNotch() }, [CalcSelectedNotch])
  useEffect(() => {
    console.log(`use effect ovewrite selected: ${OverwriteSelected} <->${Selected}`)
    if (OverwriteSelected !== Selected) {
      setSelected(OverwriteSelected)
      SelectNotch(OverwriteSelected - Selected)
    }
  }, [OverwriteSelected, Selected]) // eslint-disable-line


  return (
    <svg height={Radius * 2 + 30} width={Radius * 2 + 10}>
      {/* Knob */}
      <circle cx={cx(Radius)} cy={cy(Radius)} r={Radius} stroke="darkgrey" strokeWidth="1" fill="none" />
      <circle cx={cx(Radius)} cy={cy(Radius)} r={Radius - 3} stroke="grey" strokeWidth="5" fill="grey" />
      {/* Marker */}
      <circle cx={MidX} cy={MidY} r={10} stroke="lightgray" fill="darkgrey" />
      {/* labels click spots */}
      <text x={cx(Radius) - 40} y={25} fill="white" fontSize={25}>-</text>
      <text x={cx(Radius) + 30} y={25} fill="white" fontSize={25}>+</text>
      {/*  Click spot for dial back */}
      <rect
        y={20}
        height={Radius * 2}
        width={(Radius * 2 + 10) / 2}
        // stroke="red"
        fillOpacity={0}
        onClick={() => SelectNotch(-1)}
      />
      {/* Click spot for dial up */}
      <rect
        y={20}
        x={(Radius * 2 + 10) / 2}
        height={Radius * 2}
        width={(Radius * 2 + 10) / 2}
        // stroke="blue"
        fillOpacity={0}
        onClick={() => SelectNotch(+1)}
      />
    </svg>
  )
}

Selector.propTypes = {
  Amount: PropTypes.number.isRequired,
  OverwriteSelected: PropTypes.number,
  Radius: PropTypes.number.isRequired,
  cb: PropTypes.func,
  Side: PropTypes.oneOf(['L', 'R']),
}

Selector.defaultProps = {
  OverwriteSelected: 1,
  Side: 'R',
  cb: undefined,
}

export default Selector
