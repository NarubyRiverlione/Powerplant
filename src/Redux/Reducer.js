/* eslint no-case-declarations:off */
import {
  Actions, CstPumps, CstIntakeValve, CstOutputValve, CstReactor,
} from '../Cst'
import { CalcPressure, CalcFlow, CalcBypassValve } from './CalcSteam'


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
    const BypassValve = CalcBypassValve(SteamFlow)
    return {
      ...state,
      SteamTemp,
      SteamPressure,
      SteamFlow,
      BypassValve,
    }
  default:
    return state
  }
}
