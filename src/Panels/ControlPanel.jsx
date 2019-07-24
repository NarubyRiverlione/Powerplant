import React from 'react'
import PropTypes from 'prop-types'

import Display from '../Components/ControlElements/Display'


const ControlPanel = ({
  Name, StatusStatus, ErrorMsg, children,
}) => (
  <div className="CardStyle d-flex flex-column">

    <div className="CardHeader d-flex flex-row">
      <span style={{ marginRight: 10 }}>{Name}</span>

      <Display Width={480} Text={StatusStatus} ErrorMsg={ErrorMsg} />
    </div>

    <div className="CardContent">
      {children}
    </div>

  </div>
)


ControlPanel.propTypes = {
  Name: PropTypes.string.isRequired,
  StatusStatus: PropTypes.string.isRequired,
  ErrorMsg: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

ControlPanel.defaultProps = {
  ErrorMsg: false,
}

export default ControlPanel
