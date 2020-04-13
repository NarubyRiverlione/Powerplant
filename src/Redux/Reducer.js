/* eslint no-case-declarations:off */
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
    [CstPumps.RecircPump1]: 0,
    [CstPumps.RecircPump2]: 0,
  },

  Valves: {
    [`${CstPumps.RecircPump1}_${CstIntakeValve}`]: false,
    [`${CstPumps.RecircPump1}_${CstOutputValve}`]: false,
    [`${CstPumps.RecircPump2}_${CstIntakeValve}`]: false,
    [`${CstPumps.RecircPump2}_${CstOutputValve}`]: false,
  },

  Flows: {
    [CstPumps.RecircPump1]: 0,
    [CstPumps.RecircPump2]: 0,
  },

  Fout: false,
  Foutmelding: null,
}


export const AppReducer = (state = InitialState, action) => {
  switch (action.type) {
    // Valves & Pumps & Flows
    case Actions.ToggleValve:
      return {
        ...state,
        Valves: action.Valves,
      }
    case Actions.SetPump:
      return {
        ...state,
        Pumps: action.Pumps,
      }
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
    case Actions.EnergyAddDelta:
      return {
        ...state,
        Energy: state.Energy + action.EnergyChange,
      }
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
    - create steam flow from the drum to the turbine
    - open the bypass when (steam supply - steam into turbine) > CstSteam.BypassMinPressure
    - create power in the generator when steam is supplied to the turbine via the setpoint
    */
    case Actions.ChangeSteam:
      const SteamTemp = state.ReactorTemp - action.Loss < 0 ? 0 : state.ReactorTemp - action.Loss
      const SteamPressure = CalcSteam.Pressure(SteamTemp)
      const SteamFlow = CalcSteam.Flow(SteamPressure)
      const ReactorLevelChange = CalcSteam.ReactorLevelChange(SteamPressure, state.FeedwaterFlow)
      const BypassValve = CalcSteam.BypassValve(SteamFlow, state.TurbineSetpoint)
      const TurbineSteamIntake = CalcSteam.TurbineSteamIntake(SteamFlow, state.TurbineSetpoint)
      const GeneratorPower = CalcSteam.Generator(TurbineSteamIntake, state.GeneratorBreaker, state.TurbineSpeed)

      return {
        ...state,
        SteamTemp,
        SteamPressure,
        SteamFlow,
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
