import {
  CstFlowMax, CstOutputValve, CstIntakeValve, CstPumps, CstChangeStep, CstTiming,
} from '../Cst'
import ChangeOverTime from './Changes'


const CalcFlow = (PumpName, Level) => Level * CstFlowMax[PumpName]

// only flow when intake and output valves are open
const TargetFlow = (Level, Valves, PumpName) => (Valves[`${PumpName}_${CstIntakeValve}`]
  && Valves[`${PumpName}_${CstOutputValve}`]
  ? CalcFlow(PumpName, Level)
  : 0)


const SetFlow = (PumpName, Valves, Flows, Pumps, dispatch, ChangeFlow, ChangeSteam) => {
  const Level = Pumps[PumpName]

  const NewFlow = TargetFlow(Level, Valves, PumpName)
  const OldFlow = Flows[PumpName]
  const FlowDelta = NewFlow - OldFlow
  if (FlowDelta === 0) return

  let Step
  if (PumpName.includes(CstPumps.FeedwaterPump1) || PumpName.includes(CstPumps.FeedwaterPump2)) {
    Step = Math.sign(FlowDelta) * CstChangeStep.FeedwaterPump
  }
  if (PumpName.includes('Recirculate')) {
    Step = Math.sign(FlowDelta) * CstChangeStep.RecirculatePump
  }
  if (!Step) console.error('cannot find step for pump')
  let TempFlow = OldFlow

  // update flow every tick
  const UpdateFlowByStep = (FlowChangeBy) => {
    ChangeFlow(FlowChangeBy, PumpName, dispatch)

    // change recirc flow -->  steam temp & pressure
    if (PumpName.includes('Recirculate')) {
      // update state is async, not sure state.Flows is already up-to-date
      // --> create Flows here
      TempFlow += FlowChangeBy
      const UpdatedFlows = { ...Flows, [PumpName]: TempFlow }
      ChangeSteam(UpdatedFlows, dispatch)
    }

    if (PumpName.includes('Feedwater')) {
      console.error('no logic for feedwater flow')
    }
  }

  console.log(`Flow start changing: todo:${FlowDelta} , step=${Step}`)
  ChangeOverTime(CstTiming.FeedwaterPumpChange, Step,
    FlowDelta, (step) => UpdateFlowByStep(step))
}

export default SetFlow
