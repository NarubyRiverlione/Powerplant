import React from 'react'
import PropTypes from 'prop-types'


const cx = r => r + 5
const cy = r => r + 20

export default class Selector extends React.Component {
  constructor(props) {
    super(props)
    this.state = { MidX: 0, MidY: 0 }
    const { StartSelected } = this.props
    this.Selected = StartSelected
  }

  componentDidMount() {
    this.CalcSelectedNotch()
  }

  CalcSelectedNotch() {
    const { Side, Amount, Radius } = this.props

    const AngleNotch = 180.0 / (Amount + 1)
    const Align = Side === 'R' ? -1 : 1
    const AngleSelectedNotch = 90.0 + (this.Selected * AngleNotch * Align)
    const RadialNotch = AngleSelectedNotch * Math.PI / 180.0

    const MidX = cx(Radius) + Radius * Math.cos(RadialNotch) + (15 * Align)
    const MidY = cy(Radius) - Radius * Math.sin(RadialNotch)
    this.setState({ MidX, MidY })
  }

  SelectNextNotch() {
    const { Amount, cb } = this.props
    const NewSelectedNotch = this.Selected + 1 > Amount ? 1 : this.Selected + 1
    this.Selected = NewSelectedNotch
    this.CalcSelectedNotch()

    // cb will change prop Selected
    if (cb) {
      cb(this.Selected)
    }
  }


  render() {
    const { Radius } = this.props
    const { MidX, MidY } = this.state

    return (
      <div onClick={() => this.SelectNextNotch()}>
        <svg height={Radius * 2 + 30} width={Radius * 2 + 10}>
          {/* Knob */}
          <circle cx={cx(Radius)} cy={cy(Radius)} r={Radius} stroke="darkgrey" strokeWidth="1" fill="none" />
          <circle cx={cx(Radius)} cy={cy(Radius)} r={Radius - 3} stroke="grey" strokeWidth="5" fill="grey" />
          {/* Marker */}
          <circle cx={MidX} cy={MidY} r={10} stroke="white" fill="darkgrey" />
        </svg>
      </div>
    )
  }
}

Selector.propTypes = {
  Amount: PropTypes.number.isRequired,
  StartSelected: PropTypes.number,
  Radius: PropTypes.number.isRequired,
  cb: PropTypes.func,
  Side: PropTypes.oneOf(['L', 'R']),
}

Selector.defaultProps = {
  StartSelected: 1,
  Side: 'R',
  cb: undefined,
}
