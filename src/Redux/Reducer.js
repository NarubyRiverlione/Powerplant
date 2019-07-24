import { Actions } from '../Cst'
import CalcPressure from './CalcPressure'

export const InitialState = {

  Energy: 0,

  ReactorTemp: 0,
  ReactorPressure: 0,

  Fout: false,
  Foutmelding: null,
}


export const AppReducer = (state = InitialState, action) => {
  switch (action.type) {
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
  case Actions.ReactorPressureCalc:
    return {
      ...state,
      ReactorPressure: CalcPressure(state.ReactorTemp),
    }
  default:
    return state
  }
}
