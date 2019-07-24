import { CstTiming, Actions, CstReactor } from '../Cst'

const ChangeReactorTemp = (EnergyChange, dispatch) => (
  dispatch({
    type: Actions.ReactTempAddDelta,
    ReactTempDelta: EnergyChange,
  })
)
const ChangeReactorPressure = dispatch => (
  dispatch({ type: Actions.ReactorPressureCalc })
)

/* Change energy level in reactor
The change will take time (CstTiming.EnergyChange)
And will in turn change the reactor temperature and pressure
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
    const EnergyChange = Math.sign(EnergyDelta) * CstReactor.EnergyStep
    // change energy
    dispatch({
      type: Actions.EnergyAddDelta,
      EnergyChange,
    })
    // change temp. & press.
    ChangeReactorTemp(EnergyChange, dispatch)
    ChangeReactorPressure(dispatch)
  }, CstTiming.EnergyChange)
}

// set energy level in reactor
export const ReactorSetStartEnergy = (StartEnergy, dispatch) => {
  dispatch({
    type: Actions.ReactorSetStartEnergy,
    StartEnergy,
  })
  // change temp. & press.
  ChangeReactorTemp(StartEnergy + CstReactor.ColdTemp, dispatch)
  ChangeReactorPressure(dispatch)
}
