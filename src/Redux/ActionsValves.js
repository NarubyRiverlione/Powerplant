import {
  Actions, CstIntakeValve, CstFlowMax, CstOutputValve, CstTiming, CstChangeStep,
} from '../Cst'

import { SetSteamFlow, ChangeSteamOverTime } from './CalcSteam'
import ChangeOverTime from './Changes'
import SetFlow from './CalcFlows'


const CheckAfterValveOperation = (Pumpname, Valvename, dispatch, getState) => {
  const { Pumps, Flows, Valves } = getState()
  // check if both valve are complete open
  // and the pump that is running
  //  --> set pump flow
  if (
    // pump is running
    Pumps[Pumpname]
    // the intake valve of this pump must be complete open
    && Flows[`${Pumpname}_${CstIntakeValve}`] === CstFlowMax[`${CstIntakeValve}`]
    // the output valve of this pump must be complete open
    && Flows[`${Pumpname}_${CstOutputValve}`] === CstFlowMax[`${CstOutputValve}`]
  ) {
    SetFlow(Pumpname, Valves, Flows, Pumps, dispatch, SetSteamFlow, ChangeSteamOverTime)
  }

  // a pump is connected to this now closing valve --> stop pump flow
  // doesn't matter if it's a intake of output valve as both must be complete open
  // to operate the pump
  if (Pumpname && Flows[Valvename] === 0) {
    dispatch({
      type: Actions.FlowChange,
      Flows: { ...Flows, [Pumpname]: 0 },
    })
  }
}

// open or close a valve -- > change flow in valve
// check if a pump is running --> change pump flow
const ToggleValve = (ValveName, PumpName) => (
  (dispatch, getState) => {
    const { Valves, Flows, Pumps } = getState()
    const CurrentPostion = Valves[ValveName]
    const NewPosition = !CurrentPostion
    const currentValveFlow = Flows[ValveName]

    // cannot change valve position if it's already in transit
    if (currentValveFlow !== CstFlowMax.Valve // CstFlowMax[ValveName]
      && currentValveFlow !== 0) { // CstFlowMin[ValveName])
      console.warn(`CANNOT change ${ValveName} as it's already in transit`)
      return
    }

    // output valve can only be open when pump is running
    if (ValveName.includes([CstOutputValve]) && !Pumps[PumpName]) {
      console.warn(`CANNOT open  ${ValveName} as  ${PumpName} isn't running`)
      return
    }

    // input valve can only be closed when pump isn't running
    if (ValveName.includes([CstIntakeValve]) && Pumps[PumpName]
      && !NewPosition) {
      console.warn(`CANNOT close  ${ValveName} as  ${PumpName} is running`)
      return
    }


    // change valve button
    const newValves = { ...Valves, [ValveName]: NewPosition }
    dispatch({
      type: Actions.ToggleValve,
      Valves: newValves,
    })

    // callback for ChangeOverTime tick
    const ChangeValveFlow = (Valvename, Step) => {
      // update valve flow
      dispatch({
        type: Actions.ValveFlowChange,
        Valvename,
        Step,
      })
    }

    // open or close valve slowly over time
    // change flow of valve and pump
    const direction = NewPosition ? +1 : -1

    const target = currentValveFlow === 0 || currentValveFlow === CstFlowMax.Valve
      ? CstFlowMax.Valve
      : currentValveFlow

    // console.log(target)
    ChangeOverTime(CstTiming.ValveChange,
      CstChangeStep.ValveChange * direction,
      target,
      (step) => ChangeValveFlow(ValveName, step),
      true,
      () => { CheckAfterValveOperation(PumpName, ValveName, dispatch, getState) })
  })

export default ToggleValve
