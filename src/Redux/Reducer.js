/* eslint no-case-declarations:off */
import {
  Actions, CstPumps, CstIntakeValve, CstOutputValve, CstReactor,
} from '../Cst'
import {
  CalcPressure, CalcFlow, CalcBypassValve, CalcTurbineSteamIntake, CalcGenerator,
} from './CalcSteam'


export const InitialState = {
  // Reactor
  Energy: 0,
  ReactorTemp: CstReactor.ColdTemp,
  // Steam
  SteamTemp: 0,
  SteamPressure: 0,
  SteamFlow: 0,
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
    [CstPumps.RecircPump1]: 0.25,
    [CstPumps.RecircPump2]: 0.25,
  },

  Valves: {
    [`${CstPumps.RecircPump1}_${CstIntakeValve}`]: true,
    [`${CstPumps.RecircPump1}_${CstOutputValve}`]: true,
    [`${CstPumps.RecircPump2}_${CstIntakeValve}`]: true,
    [`${CstPumps.RecircPump2}_${CstOutputValve}`]: true,
  },

  Flows: {
    [CstPumps.RecircPump1]: 1250,
    [CstPumps.RecircPump2]: 1250,
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
      Valves: { ...state.Valves, [action.ValveName]: action.Position },
    }
  case Actions.SetPump:
    return {
      ...state,
      Pumps: { ...state.Pumps, [action.PumpName]: action.Level },
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
    // Reactor Energy & Temp
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

    // Steam Temp & Pressure
  case Actions.ChangeSteam:
    const SteamTemp = state.ReactorTemp - action.Loss < 0 ? 0 : state.ReactorTemp - action.Loss
    const SteamPressure = CalcPressure(SteamTemp)
    const SteamFlow = CalcFlow(SteamPressure)
    const BypassValve = CalcBypassValve(SteamFlow, state.TurbineSetpoint)
    const TurbineSteamIntake = CalcTurbineSteamIntake(SteamFlow, state.TurbineSetpoint)
    const GeneratorPower = CalcGenerator(TurbineSteamIntake, state.GeneratorBreaker, state.TurbineSpeed)

    return {
      ...state,
      SteamTemp,
      SteamPressure,
      SteamFlow,
      BypassValve,
      TurbineSteamIntake,
      GeneratorPower,
      GeneratorBreaker: TurbineSteamIntake > 0 ? state.GeneratorBreaker : false,
    }

    // setpoint to let steam into turbine
  case Actions.TurbineSetpointChange:
    const TurbineSetpoint = state.TurbineSetpoint + action.Step < 0 ? 0 : state.TurbineSetpoint + action.Step
    const TurbineSteamIntakeUpdate = CalcTurbineSteamIntake(state.SteamFlow, TurbineSetpoint)

    return {
      ...state,
      TurbineSetpoint,
      TurbineSteamIntake: TurbineSteamIntakeUpdate,
      BypassValve: CalcBypassValve(state.SteamFlow, TurbineSteamIntakeUpdate),
      GeneratorPower: CalcGenerator(TurbineSteamIntakeUpdate, state.GeneratorBreaker, state.TurbineSpeed),
      GeneratorBreaker: TurbineSteamIntakeUpdate > 0 ? state.GeneratorBreaker : false,
    }

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
      GeneratorPower: CalcGenerator(state.TurbineSteamIntake, action.GeneratorBreaker, state.TurbineSpeed),
    }
  default:
    return state
  }
}
