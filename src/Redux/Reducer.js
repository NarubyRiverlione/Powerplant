/* eslint-disable indent */
/* eslint-disable no-case-declarations */
import {
  Actions,
} from '../Cst'

import {
  CalcPressureViaTemp, CalcTurbineSteamIntake, CalcSteamFlow, CalcGeneratorOutput,
  CalcFeedwaterFlow, CalcBypassValveOpen, CalcReactorLevelChange,
} from './CalcSteam'

import InitialState from './InitialState'

const AppReducer = (state = InitialState, action) => {
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
        // Hotwell: action.Hotwell,
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
      const SteamPressure = CalcPressureViaTemp(SteamTemp)
      const SteamFlow = CalcSteamFlow(SteamPressure)

      const TurbineSteamIntake = CalcTurbineSteamIntake(SteamFlow, state.TurbineSetpoint)
      const BypassValve = CalcBypassValveOpen(SteamFlow, state.TurbineSetpoint)

      const FeedwaterFlow = CalcFeedwaterFlow(SteamFlow, TurbineSteamIntake)
      const ReactorLevelChange = CalcReactorLevelChange(SteamFlow, FeedwaterFlow)

      const GeneratorPower = CalcGeneratorOutput(TurbineSteamIntake, state.GeneratorBreaker, state.TurbineSpeed)

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
      const TurbineSteamIntakeUpdate = CalcTurbineSteamIntake(state.SteamFlow, TurbineSetpoint)

      return {
        ...state,
        TurbineSetpoint,
        TurbineSteamIntake: TurbineSteamIntakeUpdate,
        BypassValve: CalcBypassValveOpen(state.SteamFlow, TurbineSteamIntakeUpdate),
        GeneratorPower: CalcGeneratorOutput(TurbineSteamIntakeUpdate, state.GeneratorBreaker, state.TurbineSpeed),
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
        GeneratorPower: CalcGeneratorOutput(state.TurbineSteamIntake, action.GeneratorBreaker, state.TurbineSpeed),
      }

    case Actions.ChangeHotWell:
      return { ...state, ChangeHotWell: action.ChangeHotWell }

    default:
      return state
  }
}

export default AppReducer
