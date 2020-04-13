import * as Cst from '../Cst'
import ChangeOverTime from './Changes'


const CalcFlow = (PumpName, Level) => Level * Cst.CstFlowMax[PumpName]

// only flow when intake and output valves are open
const TargetFlow = (Level, Valves, PumpName) => (Valves[`${PumpName}_${Cst.CstIntakeValve}`]
  && Valves[`${PumpName}_${Cst.CstOutputValve}`]
  ? CalcFlow(PumpName, Level)
  : 0)


const SetFlow = (PumpName, Valves, Flows, Pumps, dispatch, ChangeFlow, ChangeSteam) => {
  const Level = Pumps[PumpName]

  const NewFlow = TargetFlow(Level, Valves, PumpName)
  const OldFlow = Flows[PumpName]
  const FlowDelta = NewFlow - OldFlow
  if (FlowDelta === 0) return

  let Step
  if (PumpName.includes(Cst.CstPumps.RecircPump1) || PumpName.includes(Cst.CstPumps.RecircPump2)) {
    Step = Math.sign(FlowDelta) * Cst.CstChangeStep.RecircPump
  }
  let TempFlow = OldFlow

  const UpdateFlowByStep = (FlowChangeBy) => {
    ChangeFlow(FlowChangeBy, PumpName, dispatch)

    // change recirc flow -->  steam temp & pressure
    if (PumpName.includes(Cst.CstPumps.RecircPump1) || PumpName.includes(Cst.CstPumps.RecircPump2)) {
      // update state is async, not sure state.Flows is already up-to-date
      // --> create Flows here
      TempFlow += FlowChangeBy
      const UpdatedFlows = { ...Flows, [PumpName]: TempFlow }
      ChangeSteam(UpdatedFlows, dispatch)
    }
  }

  // console.log(`Flow start changing: todo:${FlowDelta} , step=${Step}`)
  ChangeOverTime(Cst.CstTiming.RecircPumpChange, Step,
    FlowDelta, (step) => UpdateFlowByStep(step))
}

export default SetFlow
