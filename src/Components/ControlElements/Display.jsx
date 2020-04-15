import React from 'react'
import PropTypes from 'prop-types'


const Display = ({
  Title, Text, Width, ErrorMsg, Suffix,
}) => {
  const Xoffset = (!Title ? 10 : Title.length * 10 + 15)
  const WidthTotal = (!Title ? 5 : Title.length * 10 + 15)
    + Width
    + (!Suffix ? 5 : Suffix.length * 15 + 15)

  return (
    // <div style={{ flex: 1 }} className="d-flex">
    <svg width={WidthTotal} height="50">
      {/* show title if provided */}
      {Title && <text x="5" y="35" className="displayTitle">{Title}</text>}

      {/* display text in rect   */}
      <rect
        x={Xoffset}
        y="15"
        width={Width}
        height="30" // 40
        style={{ fill: 'black', stroke: 'gray', strokeWidth: 2 }}
      />

      <text x={Xoffset + 10} y="35" className={ErrorMsg ? 'displayError' : 'display'}>
        {Text}
      </text>

      {/* show suffix if provided */}
      {Suffix && (
        <text
          x={Xoffset + Width + 5}
          y="35"
          className="displayTitle"
        >
          {Suffix}
        </text>
      )}

    </svg>
    // </div>
  )
}

Display.propTypes = {
  Title: PropTypes.string,
  Text: PropTypes.string.isRequired,
  Suffix: PropTypes.string,
  Width: PropTypes.number.isRequired,
  ErrorMsg: PropTypes.bool,
}

Display.defaultProps = {
  Title: '',
  Suffix: '',
  ErrorMsg: false,
}
export default Display
