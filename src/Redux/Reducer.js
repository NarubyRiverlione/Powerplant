import {
  Actions, CstPumps, CstIntakeValve, CstOutputValve,
} from '../Cst'
import CalcPressure from './CalcPressure'

export const InitialState = {

  Energy: 0,

  ReactorTemp: 0,

  SteamTemp: 0,
  SteamPressure: 0,
  MSIV: false,

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
  case Actions.SetFlow:
    return {
      ...state,
      Flows: { ...state.Flows, [action.PumpName]: action.Flow },
    }
  case Actions.ToggleMSIV:
    return {
      ...state,
      MSIV: !state.MSIV,
    }
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
  case Actions.ReactTempAddDelta:
    return {
      ...state,
      ReactorTemp: state.ReactorTemp + action.ReactTempDelta,
    }

  case Actions.SteamPressureCalc:
    return {
      ...state,
      ReactorPressure: CalcPressure(state.SteamTemp),
    }
  default:
    return state
  }
}
