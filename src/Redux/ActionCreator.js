import * as Cst from '../Cst'
import ChangeOverTime from './Changes'
import SetFlow from './CalcFlows'

const RecircFlowFactor = (Flows) => {
  const RecircFlow = Flows[Cst.CstPumps.FeedwaterPump1] + Flows[Cst.CstPumps.FeedwaterPump2]
  const MaxRecircFlow = Cst.CstFlowMax[Cst.CstPumps.FeedwaterPump1] + Cst.CstFlowMax[Cst.CstPumps.FeedwaterPump2]
  const Factor = RecircFlow / MaxRecircFlow
  // console.log(`Recirc factor: ${Factor}`)
  return Factor
}

// Change steam temp & pressure in the steam drum
// Steam can only by created when a recirculation pump is running
// steam temp is based on reactor temp - Loss
const ChangeSteam = (Flows, dispatch) => {
  if (Flows[Cst.CstPumps.FeedwaterPump1] || Flows[Cst.CstPumps.FeedwaterPump2]) {
    const Loss = Cst.CstSteam.TempLoss / RecircFlowFactor(Flows)
    // console.log(`Temp loss reactor <-> steam drum = ${Loss}`)
    setTimeout(() => {
      dispatch({ type: Cst.Actions.ChangeSteam, Loss })
    }, Cst.CstTiming.SteamChange)
  }
}

// Change the steam flow from the drum to the turbine
const ChangeSteamFlow = (FlowChangeBy, PumpName, dispatch) => {
  // console.log(`Steam flow change by:${FlowChangeBy}`)
  dispatch({
    type: Cst.Actions.FlowChange,
    PumpName,
    FlowChangeBy,
  })
}

// Change the temperature in the reactor
// if there is recirculation then adjust the steam drum temperature & pressure
const ChangeReactorTemp = (EnergyChange, Flows, dispatch) => {
  // console.log(`Reactor energy change: ${EnergyChange}`)
  // console.log(`Reactor temp was: ${state.ReactorTemp}`)
  const ReactorTempDelta = EnergyChange
  dispatch({
    type: Cst.Actions.ReactorAddDeltaTemp,
    ReactorTempDelta,
  })
  // update steam temp & pressure
  // const { Flows } = getState()
  ChangeSteam(Flows, dispatch)
}

// #region SIMULATOR
// reset the simulator
export const SimulatorReset = () => (
  { type: Cst.Actions.SimReset }
)
// Setup the simulator to a specific condition
export const SimulatorSetup = (startupSenario) => (dispatch) => {
  const setupState = Cst.StartupConditions[startupSenario]
  if (setupState) {
    dispatch({
      type: Cst.Actions.SimSetup,
      Valves: setupState.Valves,
      Pumps: setupState.Pumps,
      Flows: setupState.Flows,
      TurbineSetpoint: setupState.TurbineSetpoint,
      TurbineRollup: setupState.TurbineRollup,
      GeneratorBreaker: setupState.GeneratorBreaker,
      RodsOut: setupState.RodsOut,
    })
  }
}
// #endregion

// #region  REACTOR
/* Change energy level in reactor
The change will take time (Cst.CstTiming.EnergyChange)
And will in turn change the reactor temperature
*/
const ReactorChangeEnergy = () => (
  (dispatch, getState) => {
    const { RodSpeed, RodAction, RodsOut } = getState()
    const Steps = RodSpeed * RodAction
    console.log(`Steps: ${Steps}`)
    // count rods that are retracted
    const newRodsOut = RodsOut + Steps
    dispatch({ type: Cst.Actions.ReactorRodsOut, RodsOut: newRodsOut })

    const EnergyDelta = Steps * Cst.CstChangeStep.Energy
    // console.log(`Energy delta: ${EnergyDelta}`)

    // change each tick
    const ChangeEnergy = (step) => {
      const EnergyChange = Math.sign(step) * Cst.CstChangeStep.Energy
      // TODO prevent negative energy level
      // console.log(`Energy step: ${EnergyChange}`)
      // change energy
      dispatch({
        type: Cst.Actions.EnergyAddDelta,
        EnergyChange,
      })
      // change reactor temperature
      const { Flows } = getState()
      ChangeReactorTemp(EnergyChange, Flows, dispatch)
    }

    // make energy changes over time
    ChangeOverTime(Cst.CstTiming.EnergyChange,
      Math.sign(Steps) * Cst.CstChangeStep.Energy,
      Math.abs(EnergyDelta),
      (step) => ChangeEnergy(step),
      false,
      // done callback = release rod action button
      () => {
        dispatch({
          type: Cst.Actions.ReactorRodAction,
          RodAction: Cst.CstReactor.RodActionIdle,
        })
      })
  })
// Set speed of changing control rods
export const ChangeRodSpeed = (RodSpeed) => (
  (dispatch, getState) => {
    const { RodAction } = getState()
    if (RodAction !== Cst.CstReactor.RodActionIdle) {
      console.warn('CANNOT change rod speed will rods are in motion')
      return
    }
    dispatch({
      type: Cst.Actions.ReactorRodSpeed,
      RodSpeed,
    })
  })
// set action of rods: +1 = retract, -1 = insert
export const SetRodAction = (newRodAction) => (
  (dispatch, getState) => {
    const { RodAction } = getState()
    if (RodAction !== Cst.CstReactor.RodActionIdle) {
      console.warn('ILLEGAL rod action, rods are already in mortion')
      return
    }
    // set rod action button pressed
    dispatch({ type: Cst.Actions.ReactorRodAction, RodAction: newRodAction })
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
        type: Cst.Actions.ReactorLevelChangeTimer,
        RefReactorLevelTimer: null,
      })
    }

    const RefReactorLevelTimer = setInterval(() => {
      dispatch({ type: Cst.Actions.ReactorLevelChange })
    }, Cst.CstTiming.ReactorLevelUpdate)

    // store ref to the interval timer in state
    // so it can be stopped, and know that it's already running
    return dispatch({
      type: Cst.Actions.ReactorLevelChangeTimer,
      RefReactorLevelTimer,
    })
  })


// Set energy in reactor
export const ReactorSetStartEnergy = (StartEnergy) => (
  (dispatch, getState) => {
    dispatch({
      type: Cst.Actions.EnergyAddDelta,
      EnergyChange: StartEnergy,
    })
    // set start reactor temp
    const { Flows } = getState()
    ChangeReactorTemp(StartEnergy, Flows, dispatch)
  })
// #endregion

// #region  TURBINE & GENERATOR
// Open or close the main steam isolation valve
export const ToggleMSIV = () => (
  (dispatch) => (
    dispatch({ type: Cst.Actions.ToggleMSIV })
  ))

// change turbine setpoint
export const TurbineChangeSetpoint = (Step) => (
  (dispatch) => (
    dispatch({ type: Cst.Actions.TurbineSetpointChange, Step })
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

    dispatch({ type: Cst.Actions.TurbineSetRollup, TurbineRollup })

    const ChangeTurbineSpeed = (TurbineSpeedChange) => {
      dispatch({ type: Cst.Actions.TurbineSpeed, TurbineSpeedChange })
    }

    const direction = TurbineRollup > TurbineSpeed ? +1 : -1
    ChangeOverTime(Cst.CstTiming.TurbineRollup, Cst.CstChangeStep.TurbineRollup * direction,
      TurbineRollup - TurbineSpeed, (step) => ChangeTurbineSpeed(step))
  })

// open or close generator breaker
export const GeneratorChangeBreaker = () => (
  (dispatch, getState) => {
    const { GeneratorBreaker, TurbineSpeed } = getState()
    if (GeneratorBreaker) {
      // can always open the breaker
      dispatch({ type: Cst.Actions.GeneratorBreaker, GeneratorBreaker: false })
    }
    if (!GeneratorBreaker && TurbineSpeed === 1800) {
      // try to close breaker
      dispatch({ type: Cst.Actions.GeneratorBreaker, GeneratorBreaker: true })
    }
  })
// #endregion

// #region  General Valves & pumps
// toggle pump state, then calc flow
export const SetPump = (PumpName) => (
  (dispatch, getState) => {
    const { Pumps, Flows } = getState()
    // const CurrentStatus = Pumps[PumpName]
    // const CurrentFlow = Flows[PumpName]
    // const FlowShouldAlreadyBe = CurrentStatus ? Cst.CstFlowMax[PumpName] : 0

    // intake valve must be complete open before pump can start
    const intakeFlow = Flows[`${PumpName}_${Cst.CstIntakeValve}`]
    if (intakeFlow !== Cst.CstFlowMax[`${PumpName}_${Cst.CstIntakeValve}`]) {
      console.warn(`CANNOT start pump ${PumpName} as ${PumpName}_${Cst.CstIntakeValve} valve isn't complete open`)
      return
    }

    // toggle pump state
    const newPumpState = !Pumps[PumpName]
    const newPumps = { ...Pumps, [PumpName]: newPumpState }

    dispatch({
      type: Cst.Actions.SetPump,
      Pumps: newPumps,
    })
    /*
    if (CurrentFlow !== FlowShouldAlreadyBe) {
      // need to first set the change so it can be undone --> React see changes and renders Selector
      // console.warn(`Already changing pump. back to ${CurrentLevel}`)
      const UndoPumps = { ...Pumps, [PumpName]: CurrentStatus }
      dispatch({
        type: Cst.Actions.SetPump,
        Pumps: UndoPumps,
      })
    } else {
      SetFlow(PumpName, Valves, Flows, newPumps, dispatch, ChangeSteamFlow, ChangeSteam)
    }
    */
  })

// open or close a valve -- > change flow in valve
// check if a pump is running --> change pump flow
export const ToggleValve = (ValveName, PumpName) => (
  (dispatch, getState) => {
    const { Valves, Flows, Pumps } = getState()
    const CurrentPostion = Valves[ValveName]
    const NewPosition = !CurrentPostion
    const currentValveFlow = Flows[ValveName]

    // cannot change valve position if it's already in transit
    if (currentValveFlow !== Cst.CstFlowMax[ValveName] && currentValveFlow !== Cst.CstFlowMin[ValveName]) {
      console.warn(`CANNOT change ${ValveName} as it's already in transit`)
      return
    }

    // output valve can only be open when pump is running

    if (ValveName.includes([Cst.CstOutputValve]) && !Pumps[PumpName]) {
      console.warn(`CANNOT open  ${ValveName} as  ${PumpName} isn't running`)
      return
    }

    // input valve can only be closed when pump isn't running
    if (ValveName.includes([Cst.CstIntakeValve]) && Pumps[PumpName]
      && !NewPosition) {
      console.warn(`CANNOT close  ${ValveName} as  ${PumpName} is running`)
      return
    }


    // change valve button
    const newValves = { ...Valves, [ValveName]: NewPosition }
    dispatch({
      type: Cst.Actions.ToggleValve,
      Valves: newValves,
    })

    // callback for ChangeOverTime
    const ChangeValveFlow = (Pumpname, Valvename, Step) => {
      // update valve flow
      dispatch({
        type: Cst.Actions.ValveFlowChange,
        Valvename,
        Step,
      })

      // check if both valve are complete open
      // and the pump that is running
      //  --> set pump flow
      if (
        // pump is running
        Pumps[PumpName]
        // the intake valve of this pump must be complete open
        && Flows[`${Pumpname}_${Cst.CstIntakeValve}`] === Cst.CstFlowMax[ValveName]
        // the output valve of this pump must be complete open
        && Flows[`${Pumpname}_${Cst.CstOutputValve}`] === Cst.CstFlowMax[ValveName]
      ) {
        SetFlow(Pumpname, newValves, Flows, Pumps, dispatch, ChangeSteamFlow, ChangeSteam)
      }

      // a pump is connected to this now closing valve --> stop pump flow
      // doesn't matter if it's a intake of output valve as both must be complete open
      // to operate the pump
      if (PumpName && Flows[ValveName] === 0) {
        dispatch({
          type: Cst.Actions.FlowChange,
          Flows: { ...Flows, [PumpName]: 0 },
        })
      }
    }


    // open or close valve slowly over time
    // change flow of valve and pump
    const direction = NewPosition ? +1 : -1

    const target = currentValveFlow === Cst.CstFlowMin[ValveName] || currentValveFlow === Cst.CstFlowMax[ValveName]
      ? Cst.CstFlowMax[ValveName]
      : currentValveFlow

    // console.log(target)
    ChangeOverTime(Cst.CstTiming.ValveChange,
      Cst.CstChangeStep.ValveChange * direction,
      target,
      (step) => ChangeValveFlow(PumpName, ValveName, step),
      true)
  })
// #endregion
