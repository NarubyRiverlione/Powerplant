import { Actions } from '../Cst'
import { ChangeReactorTemp } from './ActionsReactor'

import StartupConditions from '../StartConditions/StartupConditions'
import { InitialState } from './Reducer'


// reset the simulator
export const SimulatorReset = () => (
  { type: Actions.SimReset }
)
// Setup the simulator to a specific condition
export const SimulatorSetup = (startupSenario) => (
  (dispatch) => {
    const setupState = StartupConditions[startupSenario]
    if (setupState) {
      // set state of valves, pumps..
      dispatch({
        type: Actions.SimSetup,
        Valves: { ...InitialState.Valves, ...setupState.Valves },
        Pumps: { ...InitialState.Pumps, ...setupState.Pumps },
        Flows: { ...InitialState.Flows, ...setupState.Flows },
        TurbineSetpoint: setupState.TurbineSetpoint,
        TurbineRollup: setupState.TurbineRollup,
        GeneratorBreaker: setupState.GeneratorBreaker,
        RodsOut: setupState.RodsOut,
      })
      // set energy state in reactor
      dispatch({
        type: Actions.EnergyAddDelta,
        EnergyChange: setupState.StartEnergy,
      })
      // set reactor temp
      ChangeReactorTemp(setupState.StartEnergy, setupState.Flows, dispatch)
    }
  }
)
