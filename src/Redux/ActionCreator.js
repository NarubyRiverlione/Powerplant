import * as Cst from '../Cst'
import ChangeOverTime from './Changes'
import SetFlow from './CalcFlows'

const RecircFlowFactor = (Flows) => {
  const RecircFlow = Flows[Cst.CstPumps.RecircPump1] + Flows[Cst.CstPumps.RecircPump2]
  const MaxRecircFlow = Cst.CstFlowMax[Cst.CstPumps.RecircPump1] + Cst.CstFlowMax[Cst.CstPumps.RecircPump2]
  const Factor = RecircFlow / MaxRecircFlow
  // console.log(`Recirc factor: ${Factor}`)
  return Factor
}
const ChangeSteam = (Flows, dispatch) => {
  if (Flows[Cst.CstPumps.RecircPump1] || Flows[Cst.CstPumps.RecircPump2]) {
    const Loss = Cst.Steam.TempLoss / RecircFlowFactor(Flows)
    // console.log(`Loss: ${Loss}`)
    setTimeout(() => {
      dispatch({ type: Cst.Actions.ChangeSteam, Loss })
    }, Cst.CstTiming.SteamChange)
  }
}
const ChangeFlow = (FlowChangeBy, PumpName, dispatch) => {
  // console.log(`Flow change by:${FlowChangeBy}`)
  dispatch({
    type: Cst.Actions.FlowChange,
    PumpName,
    FlowChangeBy,
  })
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
    // console.log(`Energy step: ${EnergyChange}`)
    // change energy
    dispatch({
      type: Cst.Actions.EnergyAddDelta,
      EnergyChange,
    })
    // change reactor temperature
    ChangeReactorTemp(EnergyChange, state, dispatch)
  }
  ChangeOverTime(Cst.CstTiming.EnergyChange, Cst.CstChangeStep.Energy,
    EnergyDelta, step => ChangeEnergy(step), false)
}

// Set energy level in reactor
export const ReactorSetStartEnergy = (StartEnergy, state, dispatch) => {
  dispatch({
    type: Cst.Actions.EnergyAddDelta,
    EnergyChange: StartEnergy,
  })
  // update reactor temp
  ChangeReactorTemp(StartEnergy, state, dispatch)
}
// Open or close the main steam isolation valve
export const ToggleMSIV = dispatch => (
  dispatch({ type: Cst.Actions.ToggleMSIV })
)

// change turbine setpoint
export const TurbineChangeSetpoint = (Step, dispatch) => (
  dispatch({ type: Cst.Actions.TurbineSetpointChange, Step })
)

// turbine set rollup speed, then rollup over time
export const TurbineSetRollup = (TurbineRollup, state, dispatch) => {
  const { TurbineSpeed, TurbineSteamIntake } = state

  // only rollup when there is steam
  if (TurbineSteamIntake === 0) return

  // allow only 1800 after 900 is reached
  if (TurbineRollup === 1800 && TurbineSpeed !== 900) {
    console.warn('Unable to rollup to 1800')
    return
  }

  dispatch({ type: Cst.Actions.TurbineSetRollup, TurbineRollup })

  const ChangeTurbineSpeed = (TurbineSpeedChange) => {
    dispatch({ type: Cst.Actions.TurbineSpeed, TurbineSpeedChange })
  }

  const direction = TurbineRollup > state.TurbineSpeed ? +1 : -1
  ChangeOverTime(Cst.CstTiming.TurbineRollup, Cst.CstChangeStep.TurbineRollup * direction,
    TurbineRollup - state.TurbineSpeed, step => ChangeTurbineSpeed(step))
}

// open or close generator breaker
export const GeneratorChangeBreaker = (state, dispatch) => {
  const { GeneratorBreaker, TurbineSpeed } = state
  if (GeneratorBreaker) {
    // can always open the breaker
    dispatch({ type: Cst.Actions.GeneratorBreaker, GeneratorBreaker: false })
  }
  if (!GeneratorBreaker && TurbineSpeed === 1800) {
    // try to close breaker
    dispatch({ type: Cst.Actions.GeneratorBreaker, GeneratorBreaker: true })
  }
}


// set pump level, then calc flow
export const SetPump = (PumpName, SetTo, state, dispatch) => {
  const CurrentLevel = state.Pumps[PumpName]
  const CurrentFlow = state.Flows[PumpName]
  const FlowShouldAlreadyBe = Cst.CstFlowMax[PumpName] * CurrentLevel


  const Level = SetTo * 0.25
  const Pumps = { ...state.Pumps, [PumpName]: Level }
  dispatch({
    type: Cst.Actions.SetPump,
    Pumps,
  })

  if (CurrentFlow !== FlowShouldAlreadyBe) {
    // need to first set the change so it can be undone --> React see changes and renders Selector
    console.warn(`Already changing pump. back to ${CurrentLevel}`)
    const UndoPumps = { ...Pumps, [PumpName]: CurrentLevel }
    return dispatch({
      type: Cst.Actions.SetPump,
      Pumps: UndoPumps,
    })
  }

  SetFlow(PumpName, state.Valves, state.Flows, Pumps, dispatch, ChangeFlow, ChangeSteam)
}

// open or close a valve
// check if a pump is connected --> change flow
export const ToggleValve = (ValveName, PumpName, state, dispatch) => {
  const ValveCurrent = state.Valves[ValveName]
  const NewPosition = !ValveCurrent
  const Valves = { ...state.Valves, [ValveName]: NewPosition }
  dispatch({
    type: Cst.Actions.ToggleValve,
    Valves,
  })


  // a pump is connected to this now closing valve --> stop pump flow
  if (PumpName && !NewPosition) {
    // SetFlow(PumpName, 0, state, dispatch)
    SetPump(PumpName, 0, state, dispatch)
  }
  // a pump is connected &  intake valve was already open,
  // now opening this output valve --> set flow
  if (PumpName
    && ValveName.includes(Cst.CstOutputValve)
    && NewPosition
    && Valves[`${PumpName}_${Cst.CstIntakeValve}`]) {
    // const Flow = CalcFlow(PumpName, PumpLevel)
    // SetFlow(PumpName, Flow, state, dispatch)
    SetFlow(PumpName, Valves, state.Flows, state.Pumps, dispatch, ChangeFlow, ChangeSteam)
  }
  // a pump is connected
  // output valve is open
  // now opening this input valve --> set flow
  if (PumpName
    && ValveName.includes(Cst.CstIntakeValve)
    && NewPosition
    && Valves[`${PumpName}_${Cst.CstOutputValve}`]) {
    // const Flow = CalcFlow(PumpName, PumpLevel)
    // SetFlow(PumpName, Flow, state, dispatch)
    SetFlow(PumpName, Valves, state.Flows, state.Pumps, dispatch, ChangeFlow, ChangeSteam)
  }
}
