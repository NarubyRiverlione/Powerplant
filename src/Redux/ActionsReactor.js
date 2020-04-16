import {
  Actions, CstChangeStep, CstTiming, CstReactor,
} from '../Cst'
import { ChangeSteamOverTime } from './CalcSteam'
import ChangeOverTime from './Changes'

// Change the temperature in the reactor
// if there is recirculation then adjust the steam drum temperature & pressure
export const ChangeReactorTemp = (EnergyChange, Flows, dispatch) => {
  // console.log(`Reactor energy change: ${EnergyChange}`)
  // console.log(`Reactor temp was: ${state.ReactorTemp}`)
  const ReactorTempDelta = EnergyChange
  dispatch({
    type: Actions.ReactorAddDeltaTemp,
    ReactorTempDelta,
  })
  // update steam temp & pressure
  // const { Flows } = getState()
  ChangeSteamOverTime(Flows, dispatch)
}


/* Change energy level in reactor
  The change will take time (CstTiming.EnergyChange)
  And will in turn change the reactor temperature
  */
const ReactorChangeEnergy = () => (
  (dispatch, getState) => {
    const { RodSpeed, RodAction, RodsOut } = getState()
    const Steps = RodSpeed * RodAction
    console.log(`Steps: ${Steps}`)
    // count rods that are retracted
    const newRodsOut = RodsOut + Steps
    dispatch({ type: Actions.ReactorRodsOut, RodsOut: newRodsOut })

    const EnergyDelta = Steps * CstChangeStep.Energy
    // console.log(`Energy delta: ${EnergyDelta}`)

    // change each tick
    const ChangeEnergy = (step) => {
      const EnergyChange = Math.sign(step) * CstChangeStep.Energy
      // TODO prevent negative energy level
      // console.log(`Energy step: ${EnergyChange}`)
      // change energy
      dispatch({
        type: Actions.EnergyAddDelta,
        EnergyChange,
      })
      // change reactor temperature
      const { Flows } = getState()
      ChangeReactorTemp(EnergyChange, Flows, dispatch)
    }

    // make energy changes over time
    ChangeOverTime(CstTiming.EnergyChange,
      Math.sign(Steps) * CstChangeStep.Energy,
      Math.abs(EnergyDelta),
      (step) => ChangeEnergy(step),
      false,
      // done callback = release rod action button
      () => {
        dispatch({
          type: Actions.ReactorRodAction,
          RodAction: CstReactor.RodActionIdle,
        })
      })
  })
// Set speed of changing control rods
export const ChangeRodSpeed = (RodSpeed) => (
  (dispatch, getState) => {
    const { RodAction } = getState()
    if (RodAction !== CstReactor.RodActionIdle) {
      console.warn('CANNOT change rod speed will rods are in motion')
      return
    }
    dispatch({
      type: Actions.ReactorRodSpeed,
      RodSpeed,
    })
  })
// set action of rods: +1 = retract, -1 = insert
export const SetRodAction = (newRodAction) => (
  (dispatch, getState) => {
    const { RodAction } = getState()
    if (RodAction !== CstReactor.RodActionIdle) {
      console.warn('ILLEGAL rod action, rods are already in mortion')
      return
    }
    // set rod action button pressed
    dispatch({ type: Actions.ReactorRodAction, RodAction: newRodAction })
    //  change reactor energy
    dispatch(ReactorChangeEnergy())
  })

/* change the water level in the reactor
 every  CstTiming.ReactorLevelUpdate tick
 by the previous calculated ReactorLevelChange
 */
export const ReactorLevelChangeTimer = (stop = false) => (
  (dispatch, getState) => {
    // stop interval
    if (stop) {
      const { RefReactorLevelTimer } = getState()
      clearInterval(RefReactorLevelTimer)
      return dispatch({
        type: Actions.ReactorLevelChangeTimer,
        RefReactorLevelTimer: null,
      })
    }

    const RefReactorLevelTimer = setInterval(() => {
      dispatch({ type: Actions.ReactorLevelChange })
    }, CstTiming.ReactorLevelUpdate)

    // store ref to the interval timer in state
    // so it can be stopped, and know that it's already running
    return dispatch({
      type: Actions.ReactorLevelChangeTimer,
      RefReactorLevelTimer,
    })
  })
