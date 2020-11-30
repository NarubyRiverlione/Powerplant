import { Actions, CstTiming, CstChangeStep } from '../Cst'

import ChangeOverTime from './Changes'

// change turbine setpoint
export const TurbineChangeSetpoint = (Step) => (
  (dispatch) => (
    dispatch({ type: Actions.TurbineSetpointChange, Step })
  ))

// turbine set rollup speed, then rollup over time
export const TurbineSetRollup = (TurbineRollup) => (
  (dispatch, getState) => {
    const { TurbineSpeed, TurbineSteamIntake } = getState()

    // only rollup when there is steam
    if (TurbineSteamIntake === 0) return

    // allow only 1800 after 900 is reached
    if (TurbineRollup === 1800 && TurbineSpeed !== 900) {
      console.warn('UNABLE to rollup to 1800 if not already on 900')
      return
    }

    dispatch({ type: Actions.TurbineSetRollup, TurbineRollup })

    const ChangeTurbineSpeed = (TurbineSpeedChange) => {
      dispatch({ type: Actions.TurbineSpeed, TurbineSpeedChange })
    }

    const direction = TurbineRollup > TurbineSpeed ? +1 : -1
    ChangeOverTime(CstTiming.TurbineRollup, CstChangeStep.TurbineRollup * direction,
      TurbineRollup - TurbineSpeed, (step) => ChangeTurbineSpeed(step))
  })

// open or close generator breaker
export const GeneratorChangeBreaker = () => (
  (dispatch, getState) => {
    const { GeneratorBreaker, TurbineSpeed } = getState()
    if (GeneratorBreaker) {
      // can always open the breaker
      dispatch({ type: Actions.GeneratorBreaker, GeneratorBreaker: false })
    }
    if (!GeneratorBreaker && TurbineSpeed === 1800) {
      // try to close breaker
      dispatch({ type: Actions.GeneratorBreaker, GeneratorBreaker: true })
    }
  })
