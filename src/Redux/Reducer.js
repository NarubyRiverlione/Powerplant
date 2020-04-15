/* eslint-disable indent */
/* eslint-disable no-case-declarations */
import {
  Actions, CstPumps, CstIntakeValve, CstOutputValve, CstReactor,
} from '../Cst'
import * as CalcSteam from './CalcSteam'


export const InitialState = {
  // Reactor
  Energy: 0,
  ReactorTemp: CstReactor.ColdTemp,
  ReactorLevel: 0,
  ReactorLevelChange: 0,
  RefReactorLevelTimer: null,
  RodsOut: 0,
  RodSpeed: 0,
  RodAction: 0,

  // Steam
  SteamTemp: 0,
  SteamPressure: 0,
  SteamFlow: 0,
  FeedwaterFlow: 0,
  MSIV: false,
  // Turbine
  BypassValve: 0,
  TurbineSpeed: 0,
  TurbineSetpoint: 0,
  TurbineSteamIntake: 0,
  TurbineRollup: 0,
  // Generator
  GeneratorPower: 0,
  GeneratorBreaker: false,

  Pumps: {
    [CstPumps.RecircLeftA]: false,
    [CstPumps.RecircLeftB]: false,

    [CstPumps.RecircRightA]: false,
    [CstPumps.RecircRightB]: false,

    [CstPumps.FeedwaterPump1]: false,
    [CstPumps.FeedwaterPump2]: false,
  },

  Valves: {
    [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: false,
    [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: false,

    [`${CstPumps.RecircLeftB}_${CstIntakeValve}`]: false,
    [`${CstPumps.RecircLeftB}_${CstOutputValve}`]: false,


    [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: false,
    [`${CstPumps.RecircRightA}_${CstOutputValve}`]: false,

    [`${CstPumps.RecircRightB}_${CstIntakeValve}`]: false,
    [`${CstPumps.RecircRightB}_${CstOutputValve}`]: false,


    [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: false,
    [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: false,

    [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: false,
    [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: false,
  },

  Flows: {
    [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: 0,
    [CstPumps.RecircLeftA]: 0,
    [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: 0,

    [`${CstPumps.RecircLeftB}_${CstIntakeValve}`]: 0,
    [CstPumps.RecircLeftB]: 0,
    [`${CstPumps.RecircLeftB}_${CstOutputValve}`]: 0,


    [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: 0,
    [CstPumps.RecircRightA]: 0,
    [`${CstPumps.RecircRightA}_${CstOutputValve}`]: 0,

    [`${CstPumps.RecircRightB}_${CstIntakeValve}`]: 0,
    [CstPumps.RecircRightB]: 0,
    [`${CstPumps.RecircRightB}_${CstOutputValve}`]: 0,


    [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 0,
    [CstPumps.FeedwaterPump1]: 0,
    [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 0,

    [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: 0,
    [CstPumps.FeedwaterPump2]: 0,
    [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: 0,
  },

  Fout: false,
  Foutmelding: null,
}


export const AppReducer = (state = InitialState, action) => {
  switch (action.type) {
    // Simulator
    case Actions.SimReset:
      return InitialState
    case Actions.SimSetup:
      return {
        ...state,
        Pumps: action.Pumps,
        Valves: action.Valves,
        Flows: action.Flows,
        TurbineSetpoint: action.TurbineSetpoint,
        TurbineRollup: action.TurbineRollup,
        TurbineSpeed: action.TurbineRollup,
        GeneratorBreaker: action.GeneratorBreaker,
        RodsOut: action.RodsOut,
      }
    // Valves button
    case Actions.ToggleValve:
      return {
        ...state,
        Valves: action.Valves,
      }
    // Valves flow
    case Actions.ValveFlowChange:
      return {
        ...state,
        Flows: {
          ...state.Flows,
          [action.Valvename]: state.Flows[action.Valvename] + action.Step,
        },
      }

    // Pump button
    case Actions.SetPump:
      return {
        ...state,
        Pumps: action.Pumps,
      }
    // Pump flow
    case Actions.FlowChange:
      return {
        ...state,
        Flows: {
          ...state.Flows,
          [action.PumpName]: state.Flows[action.PumpName] + action.FlowChangeBy,
        },
      }
    // MSIV
    case Actions.ToggleMSIV:
      return {
        ...state,
        MSIV: !state.MSIV,
      }
    // Reactor
    case Actions.ReactorSetStartEnergy:
      return {
        ...state,
        Energy: action.StartEnergy,
      }
    case Actions.ReactorRodSpeed:
      return { ...state, RodSpeed: action.RodSpeed }
    case Actions.ReactorRodsOut:
      return { ...state, RodsOut: action.RodsOut }
    case Actions.ReactorRodAction:
      return { ...state, RodAction: action.RodAction }

    case Actions.EnergyAddDelta:
      return { ...state, Energy: state.Energy + action.EnergyChange }
    case Actions.ReactorAddDeltaTemp:
      return {
        ...state,
        ReactorTemp: state.ReactorTemp + action.ReactorTempDelta,
      }
    case Actions.ReactorLevelChange:
      return {
        ...state,
        ReactorLevel: state.ReactorLevel + state.ReactorLevelChange,
      }
    case Actions.ReactorLevelChangeTimer:
      return {
        ...state,
        RefReactorLevelTimer: action.RefReactorLevelTimer,
      }

    /* change steam Temp & Pressure in the drum, based on the reactor temp
    - create steam flow from the drum too the turbine
    - open the bypass when (steam supply - steam into turbine) > CstSteam.BypassMinPressure
    - create power in the generator when steam is supplied to the turbine via the setpoint
    */
    case Actions.ChangeSteam:
      const SteamTemp = state.ReactorTemp - action.Loss < 0 ? 0 : state.ReactorTemp - action.Loss
      const SteamPressure = CalcSteam.Pressure(SteamTemp)
      const SteamFlow = CalcSteam.SteamFlow(SteamPressure)

      const TurbineSteamIntake = CalcSteam.TurbineSteamIntake(SteamFlow, state.TurbineSetpoint)
      const BypassValve = CalcSteam.BypassValve(SteamFlow, state.TurbineSetpoint)

      const FeedwaterFlow = CalcSteam.FeedwaterFlow(SteamFlow, TurbineSteamIntake)
      const ReactorLevelChange = CalcSteam.ReactorLevelChange(SteamFlow, FeedwaterFlow)

      const GeneratorPower = CalcSteam.Generator(TurbineSteamIntake, state.GeneratorBreaker, state.TurbineSpeed)

      return {
        ...state,
        SteamTemp,
        SteamPressure,
        SteamFlow,
        FeedwaterFlow,
        ReactorLevelChange,
        BypassValve,
        TurbineSteamIntake,
        GeneratorPower,
        GeneratorBreaker: TurbineSteamIntake > 0 ? state.GeneratorBreaker : false,
      }

    /* setpoint will set max steam flow into turbine
    steam in the turbine will
     --> close the bypass valve
     --> create power in the generator
    no steam into the turbine will trip the generator breaker */
    case Actions.TurbineSetpointChange:
      const TurbineSetpoint = state.TurbineSetpoint + action.Step < 0 ? 0 : state.TurbineSetpoint + action.Step
      const TurbineSteamIntakeUpdate = CalcSteam.TurbineSteamIntake(state.SteamFlow, TurbineSetpoint)

      return {
        ...state,
        TurbineSetpoint,
        TurbineSteamIntake: TurbineSteamIntakeUpdate,
        BypassValve: CalcSteam.BypassValve(state.SteamFlow, TurbineSteamIntakeUpdate),
        GeneratorPower: CalcSteam.Generator(TurbineSteamIntakeUpdate, state.GeneratorBreaker, state.TurbineSpeed),
        GeneratorBreaker: TurbineSteamIntakeUpdate > 0 ? state.GeneratorBreaker : false,
      }
    // prepare the turbine
    case Actions.TurbineSetRollup:
      return {
        ...state,
        TurbineRollup: action.TurbineRollup,
      }

    case Actions.TurbineSpeed:
      return {
        ...state,
        TurbineSpeed: state.TurbineSpeed + action.TurbineSpeedChange,
      }
    case Actions.GeneratorBreaker:
      return {
        ...state,
        GeneratorBreaker: action.GeneratorBreaker,
        GeneratorPower: CalcSteam.Generator(state.TurbineSteamIntake, action.GeneratorBreaker, state.TurbineSpeed),
      }
    default:
      return state
  }
}
