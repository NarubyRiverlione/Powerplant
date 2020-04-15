import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Button = ({
  Width, Caption, SetPressed, Color, TextColor, cb, TabIndex,
}) => {
  const [Background, setBackground] = useState('ForestGreen')
  const [BorderColor, setBorderColor] = useState('gray')
  const [ButtonTextColor, setButtonTextColor] = useState('GhostWhite')


  useEffect(() => {
    if (Color === 'ForestGreen' || Color === 'IndianRed') {
      setBackground((SetPressed ? 'ForestGreen' : 'IndianRed'))
    } else {
      setBackground((!SetPressed ? 'light' : '') + Color)
    }
    if (Color === 'ForestGreen' || Color === 'IndianRed') {
      setBorderColor((SetPressed ? 'gray' : 'Gainsboro'))
    } else {
      setBorderColor((!SetPressed ? 'dark' : 'light') + Color)
    }
    if (TextColor === 'GhostWhite' || TextColor === 'Navy') {
      setButtonTextColor((SetPressed ? 'GhostWhite' : 'Navy'))
    } else {
      setButtonTextColor((!SetPressed ? 'light' : '') + TextColor)
    }
  }, [SetPressed]) // eslint-disable-line

  const Click = () => {
    if (cb) { cb(Caption) }
  }

  return (
    <div style={{ margin: 5 }}>
      <svg
        width={Width + 10}
        height="50" // 60
        onClick={Click}
        onKeyDown={Click}
        role="button"
        tabIndex={TabIndex}
      >
        <rect
          x="5"
          y="5"
          rx="10"
          ry="10"
          width={Width}
          height="40" // 50
          style={{ fill: Background, stroke: BorderColor, strokeWidth: 2 }} // 5
        />

        <text
          x={Width / 2 + 2} // +5
          y="30" // 35
          fontSize="1em"
          textAnchor="middle"
          fontWeight="bold"
          fill={ButtonTextColor}
        >
          {Caption}
        </text>
      </svg>
    </div>
  )
}


export default Button

Button.propTypes = {
  Width: PropTypes.number,
  Caption: PropTypes.string.isRequired,
  Color: PropTypes.string,
  TextColor: PropTypes.string,
  TabIndex: PropTypes.number,
  SetPressed: PropTypes.bool,
  cb: PropTypes.func,
}
Button.defaultProps = {
  Color: 'ForestGreen',
  TextColor: 'GhostWhite',
  Width: 60,
  SetPressed: false,
  cb: undefined,
  TabIndex: 0,
}
