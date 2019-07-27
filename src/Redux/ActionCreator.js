import * as Cst from '../Cst'
import CalcPressure from './CalcPressure'
import ChangeOverTime from './Changes'

const CalcSteamTemp = (ReactorTemp, Flows) => {
  if (Flows[Cst.CstPumps.RecircPump1] || Flows[Cst.CstPumps.RecircPump2]) {
    const RecircRatio = (Flows[Cst.CstPumps.RecircPump1] + Flows[Cst.CstPumps.RecircPump2]) / (Cst.CstFlowMax.RecircPump1 + Cst.CstFlowMax.RecircPump2)
    const Loss = Cst.CstSteam.TempLossFactor / RecircRatio + Cst.CstSteam.TempMinLoss
    const SteamTemp = ReactorTemp - Loss
    debugger
    return SteamTemp
  }
  return 0
}

const ChangeSteam = (ReactorTemp, Flows, dispatch) => {
  const SteamTemp = CalcSteamTemp(ReactorTemp, Flows)
  console.log(`Steam change: ${SteamTemp}`)
  setTimeout(() => {
    const SteamPressure = CalcPressure(SteamTemp)
    dispatch({ type: Cst.Actions.SteamTemp, SteamTemp })
    dispatch({ type: Cst.Actions.SteamPressure, SteamPressure })
  }, Cst.CstTiming.SteamChange)
}


// Change the temperature in the reactor
// if there is recirculation then adjust the steam drum temperature & pressure
const ChangeReactorTemp = (EnergyChange, state, dispatch) => {
  const ReactorTemp = state.ReactorTemp + EnergyChange
  dispatch({
    type: Cst.Actions.ReactorTemp,
    ReactorTemp,
  })
  // update steam temp & pressure
  ChangeSteam(ReactorTemp, state.Flows, dispatch)
}

/* Change energy level in reactor
The change will take time (Cst.CstTiming.EnergyChange)
And will in turn change the reactor temperature
*/
export const ReactorChangeEnergy = (EnergyDelta, state, dispatch) => {
  // let Changed = 0
  // // keep changing energy until delta is reached
  // const RefInterval = setInterval(() => {
  //   if (Changed === Math.abs(EnergyDelta)) {
  //     // delta is reached -> stop changing energy
  //     clearInterval(RefInterval)
  //     return
  //   }
  //   Changed += 1
  //   // TODO prevent negative energy level
  //   const EnergyChange = Math.sign(EnergyDelta) * Cst.CstReactor.EnergyStep
  //   // change energy
  //   dispatch({
  //     type: Cst.Actions.EnergyAddDelta,
  //     EnergyChange,
  //   })
  //   // change reactor temperature
  //   ChangeReactorTemp(EnergyChange, state, dispatch)
  // }, Cst.CstTiming.EnergyChange)
  const ChangeEnergy = () => {
    // TODO prevent negative energy level
    const EnergyChange = Math.sign(EnergyDelta) * Cst.CstChangeStep.Energy
    // change energy
    dispatch({
      type: Cst.Actions.EnergyAddDelta,
      EnergyChange,
    })
    // change reactor temperature
    ChangeReactorTemp(EnergyChange, state, dispatch)
  }
  ChangeOverTime(Cst.CstTiming.EnergyChange, 1,
    EnergyDelta, ChangeEnergy)
}

// set energy level in reactor
export const ReactorSetStartEnergy = (StartEnergy, state, dispatch) => {
  dispatch({
    type: Cst.Actions.ReactorSetStartEnergy,
    StartEnergy,
  })
  // change reactor temperature
  ChangeReactorTemp(StartEnergy + Cst.CstReactor.ColdTemp, state, dispatch)
}

// open or close the main steam isolation valve
export const ToggleMSIV = dispatch => (
  dispatch({ type: Cst.Actions.ToggleMSIV })
)

const SetFlow = (PumpName, NewFlow, state, dispatch) => {
  const OldFlow = state.Flows[PumpName]
  const FlowDelta = NewFlow - OldFlow
  if (FlowDelta === 0) return
  let Step
  if (PumpName.includes(Cst.CstPumps.RecircPump1) || PumpName.includes(Cst.CstPumps.RecircPump2)) {
    Step = Math.sign(FlowDelta) * Cst.CstChangeStep.RecircPump
  }
  let TempFlow = OldFlow
  const ChangeFlow = (FlowChangeBy) => {
    // console.log(`Flow change by:${FlowChangeBy}`)
    dispatch({
      type: Cst.Actions.FlowChange,
      PumpName,
      FlowChangeBy,
    })
    // change recirc flow -->  steam temp & pressure
    if (PumpName.includes(Cst.CstPumps.RecircPump1) || PumpName.includes(Cst.CstPumps.RecircPump2)) {
      // update state is async, not sure state.Flows is already up-to-date
      // --> create Flows here
      TempFlow += FlowChangeBy
      const Flows = { ...state.Flows, [PumpName]: TempFlow }
      ChangeSteam(state.ReactorTemp, Flows, dispatch)
    }
  }
  // console.log(`Flow start changing: todo:${FlowDelta} , step=${Step}`)
  ChangeOverTime(Cst.CstTiming.RecircPumpChange, Step,
    FlowDelta, step => ChangeFlow(step))
}

const CalcFlow = (PumpName, Level) => Level * Cst.CstFlowMax[PumpName]

// set pump level, then calc flow
export const SetPump = (PumpName, SetTo, state, dispatch) => {
  const { Valves } = state
  const Level = SetTo * 0.25
  dispatch({
    type: Cst.Actions.SetPump,
    PumpName,
    Level,
  })

  // only flow when intake and output valves are open
  const Flow = Valves[`${PumpName}_${Cst.CstIntakeValve}`]
    && Valves[`${PumpName}_${Cst.CstOutputValve}`]
    ? CalcFlow(PumpName, Level)
    : 0

  SetFlow(PumpName, Flow, state, dispatch)
}

// open or close a valve
// check if a pump is connected --> change flow
export const ToggleValve = (ValveName, PumpName, state, dispatch) => {
  const { Valves, Pumps } = state
  const ValveCurrent = Valves[ValveName]
  const NewPosition = !ValveCurrent
  const PumpLevel = Pumps[PumpName]
  dispatch({
    type: Cst.Actions.ToggleValve,
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
    && ValveName.includes(Cst.CstOutputValve)
    && NewPosition
    && Valves[`${PumpName}_${Cst.CstIntakeValve}`]) {
    const Flow = CalcFlow(PumpName, PumpLevel)
    SetFlow(PumpName, Flow, state, dispatch)
  }
  // a pump is connected
  // output valve is open
  // now opening this input valve --> set flow
  if (PumpName
    && ValveName.includes(Cst.CstIntakeValve)
    && NewPosition
    && Valves[`${PumpName}_${Cst.CstOutputValve}`]) {
    const Flow = CalcFlow(PumpName, PumpLevel)
    SetFlow(PumpName, Flow, state, dispatch)
  }
}
