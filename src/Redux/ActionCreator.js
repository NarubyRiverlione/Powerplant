import * as Cst from '../Cst'
import ChangeOverTime from './Changes'

const RecircFlowFactor = (Flows) => {
  const RecircFlow = Flows[Cst.CstPumps.RecircPump1] + Flows[Cst.CstPumps.RecircPump2]
  const MaxRecircFlow = Cst.CstFlowMax[Cst.CstPumps.RecircPump1] + Cst.CstFlowMax[Cst.CstPumps.RecircPump2]
  const Factor = RecircFlow / MaxRecircFlow
  // console.log(`Recirc factor: ${Factor}`)
  return Factor
}

const ChangeSteam = (Flows, dispatch) => {
  if (Flows[Cst.CstPumps.RecircPump1] || Flows[Cst.CstPumps.RecircPump2]) {
    const Loss = Cst.CstSteam.TempLoss / RecircFlowFactor(Flows)
    // console.log(`Loss: ${Loss}`)
    setTimeout(() => {
      dispatch({ type: Cst.Actions.ChangeSteam, Loss })
    }, Cst.CstTiming.SteamChange)
  }
}


// Change the temperature in the reactor
// if there is recirculation then adjust the steam drum temperature & pressure
const ChangeReactorTemp = (EnergyChange, state, dispatch) => {
  // console.log(`Reactor energy change: ${EnergyChange}`)
  // console.log(`Reactor temp was: ${state.ReactorTemp}`)
  const ReactorTempDelta = EnergyChange
  dispatch({
    type: Cst.Actions.ReactorAddDeltaTemp,
    ReactorTempDelta,
  })
  // update steam temp & pressure
  ChangeSteam(state.Flows, dispatch)
}

/* Change energy level in reactor
The change will take time (Cst.CstTiming.EnergyChange)
And will in turn change the reactor temperature
*/
export const ReactorChangeEnergy = (Steps, state, dispatch) => {
  // console.log(`Steps: ${Steps}`)
  const EnergyDelta = Steps * Cst.CstChangeStep.Energy
  // console.log(`Energy delta: ${EnergyDelta}`)

  const ChangeEnergy = (step) => {
    // TODO prevent negative energy level
    const EnergyChange = Math.sign(step) * Cst.CstChangeStep.Energy
    // console.log(`Energy steo: ${EnergyChange}`)
    // change energy
    dispatch({
      type: Cst.Actions.EnergyAddDelta,
      EnergyChange,
    })
    // change reactor temperature
    ChangeReactorTemp(EnergyChange, state, dispatch)
  }
  ChangeOverTime(Cst.CstTiming.EnergyChange, Cst.CstChangeStep.Energy,
    EnergyDelta, step => ChangeEnergy(step))
}

// set energy level in reactor
export const ReactorSetStartEnergy = (StartEnergy, state, dispatch) => {
  dispatch({
    type: Cst.Actions.EnergyAddDelta,
    EnergyChange: StartEnergy,
  })
  // update reactor temp
  ChangeReactorTemp(StartEnergy, state, dispatch)
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
      ChangeSteam(Flows, dispatch)
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
    SetFlow(PumpName, 0, state, dispatch)
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
