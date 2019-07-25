import {
  CstTiming, Actions, CstReactor, CstIntakeValve, CstOutputValve, CstFlowMax,
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

const SetFlow = (PumpName, Flow, dispatch) => dispatch({ type: Actions.SetFlow, PumpName, Flow })

const CalcFlow = (PumpName, Level) => Level * CstFlowMax[PumpName]

// set pump level, then calc flow
export const SetPump = (PumpName, SetTo, Valves, dispatch) => {
  const Level = SetTo * 0.25
  dispatch({
    type: Actions.SetPump,
    PumpName,
    Level,
  })
  // only flow when intake and output valves are open
  const Flow = Valves[`${PumpName}_${CstIntakeValve}`]
    && Valves[`${PumpName}_${CstOutputValve}`]
    ? CalcFlow(PumpName, Level)
    : 0

  SetFlow(PumpName, Flow, dispatch)
}


export const ToggleValve = (ValveName, Valves, PumpName, Pumps, dispatch) => {
  const ValveCurrent = Valves[ValveName]
  const NewPosition = !ValveCurrent
  const PumpLevel = Pumps[PumpName]
  dispatch({
    type: Actions.ToggleValve,
    ValveName,
    Position: NewPosition,
  })
  // a pump is connected to this now closing valve --> stop pump flow
  if (PumpName && !NewPosition) {
    SetFlow(PumpName, 0, dispatch)
  }
  // a pump is connected
  // intake valve is open
  // now opening this output valve --> set flow
  if (PumpName
    && ValveName.includes(CstOutputValve)
    && NewPosition
    && Valves[`${PumpName}_${CstIntakeValve}`]) {
    const Flow = CalcFlow(PumpName, PumpLevel)
    SetFlow(PumpName, Flow, dispatch)
  }
  // a pump is connected
  // output valve is open
  // now opening this input valve --> set flow
  if (PumpName
    && ValveName.includes(CstIntakeValve)
    && NewPosition
    && Valves[`${PumpName}_${CstOutputValve}`]) {
    const Flow = CalcFlow(PumpName, PumpLevel)
    SetFlow(PumpName, Flow, dispatch)
  }
}
