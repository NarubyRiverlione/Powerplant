import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom'
import { CstNavScreens } from '../Cst'
import { SimulatorReset, SimulatorSetup } from '../Redux/ActionsSimulator'

import Button from './ControlElements/Button'

const Startup = (startupSenario, dispatch, history) => {
  // Reset simulator : all valves, pumps,..
  dispatch(SimulatorReset())
  // Setup wanted state of reactor, valves, pumps..
  dispatch(SimulatorSetup(startupSenario))
  // go to power plant screen
  history.push(CstNavScreens.PowerplantScreen)
}

const StartupChoice = ({ Choice }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Button
      Caption={Choice.Title}
      Color="SteelBlue"
      TextColor="FloralWhite"
      Width={400}
      cb={() => Startup(Choice.Name, dispatch, history)}
    />


  )
}

export default StartupChoice

StartupChoice.propTypes = {
  Choice: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
}
