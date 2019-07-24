import {
  CstTiming, Actions, CstReactor, CstPumps,
} from '../Cst'

const ChangeReactorTemp = (EnergyChange, dispatch) => (
  dispatch({
    type: Actions.ReactTempAddDelta,
    ReactTempDelta: EnergyChange,
  })
)
const ChangeSteamTemp = dispatch => (
  dispatch({ type: Actions.SteamTempCalc })
)
const ChangeSteamPressure = dispatch => (
  dispatch({ type: Actions.SteamPressureCalc })
)

/* Change energy level in reactor
The change will take time (CstTiming.EnergyChange)
And will in turn change the reactor temperature
*/
export const ReactorChangeEnergy = (EnergyDelta, dispatch) => {
  let Changed = 0
  // keep changing energy until delta is reached
  const RefInterval = setInterval(() => {
    if (Changed === Math.abs(EnergyDelta)) {
      // delta is reached -> stop changing energy
      clearInterval(RefInterval)
      return
    }
    Changed += 1
    // TODO prevent negative energy level
    const EnergyChange = Math.sign(EnergyDelta) * CstReactor.EnergyStep
    // change energy
    dispatch({
      type: Actions.EnergyAddDelta,
      EnergyChange,
    })
    // change reactor temperature
    ChangeReactorTemp(EnergyChange, dispatch)
  }, CstTiming.EnergyChange)
}

// set energy level in reactor
export const ReactorSetStartEnergy = (StartEnergy, dispatch) => {
  dispatch({
    type: Actions.ReactorSetStartEnergy,
    StartEnergy,
  })
  // change reactor temperature
  ChangeReactorTemp(StartEnergy + CstReactor.ColdTemp, dispatch)
}

// open or close the main steam isolation valve
export const ToggleMSIV = dispatch => (
  dispatch({ type: Actions.ToggleMSIV })
)

// set recirculate pump 1 or 2
export const SetPump = (ChangePump, SetTo, dispatch) => (
  dispatch({
    type: Actions.SetPump,
    ChangePump,
    Setting: SetTo * 0.25,
  })
)
