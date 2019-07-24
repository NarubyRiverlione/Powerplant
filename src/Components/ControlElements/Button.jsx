import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Button = ({
  Width, Caption, SetPressed, Color, TextColor, cb, TabIndex,
}) => {
  const [Background, setBackground] = useState('')
  const [BorderColor, setBorderColor] = useState('')
  const [ButtonTextColor, setButtonTextColor] = useState('')


  useEffect(() => {
    setBackground((!SetPressed ? '' : 'light') + Color)
    setBorderColor((!SetPressed ? 'light' : 'dark') + Color)
    setButtonTextColor((!SetPressed ? '' : 'light') + TextColor)
  }, [Color, TextColor, SetPressed, setBackground, setBorderColor, setButtonTextColor])

  const Click = () => {
    if (cb) { cb(Caption) }
  }

  return (
    <div style={{ margin: 5 }}>
      <svg
        width={Width + 10}
        height="60"
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
          height="50"
          style={{ fill: Background, stroke: BorderColor, strokeWidth: 5 }}
        />

        <text
          x={Width / 2 + 5}
          y="35"
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
  Color: PropTypes.string.isRequired,
  TextColor: PropTypes.string.isRequired,
  TabIndex: PropTypes.number,
  SetPressed: PropTypes.bool,
  cb: PropTypes.func,
}
Button.defaultProps = {
  Width: 60,
  SetPressed: false,
  cb: undefined,
  TabIndex: 0,
}
