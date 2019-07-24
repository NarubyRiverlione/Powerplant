import React from 'react'
import PropTypes from 'prop-types'


import Button from './ControlElements/Button'

const ReactorButton = ({ Step, cb }) => (
  <Button
    Caption={Step > 0 ? `+${Step}` : `${Step}`}
    Color="SteelBlue"
    TextColor="FloralWhite "
    cb={cb}
  />
)

ReactorButton.propTypes = {
  Step: PropTypes.number.isRequired,
  cb: PropTypes.func.isRequired,
}

export default ReactorButton
