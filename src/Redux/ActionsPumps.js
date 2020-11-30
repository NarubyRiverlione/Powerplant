import { Actions, CstIntakeValve, CstFlowMax } from '../Cst'

// toggle pump state, then calc flow
const SetPump = (PumpName) => (
  (dispatch, getState) => {
    const { Pumps, Flows } = getState()
    // const CurrentStatus = Pumps[PumpName]
    // const CurrentFlow = Flows[PumpName]
    // const FlowShouldAlreadyBe = CurrentStatus ? Cst.CstFlowMax[PumpName] : 0

    // intake valve must be complete open before pump can start
    const intakeFlow = Flows[`${PumpName}_${CstIntakeValve}`]
    if (intakeFlow !== CstFlowMax.Valve) {
      console.warn(`CANNOT start pump ${PumpName} as ${PumpName}_${CstIntakeValve} valve isn't complete open`)
      return
    }

    // toggle pump state
    const newPumpState = !Pumps[PumpName]
    const newPumps = { ...Pumps, [PumpName]: newPumpState }

    dispatch({
      type: Actions.SetPump,
      Pumps: newPumps,
    })
    /*
    if (CurrentFlow !== FlowShouldAlreadyBe) {
      // need to first set the change so it can be undone --> React see changes and renders Selector
      // console.warn(`Already changing pump. back to ${CurrentLevel}`)
      const UndoPumps = { ...Pumps, [PumpName]: CurrentStatus }
      dispatch({
        type: Cst.Actions.SetPump,
        Pumps: UndoPumps,
      })
    } else {
      SetFlow(PumpName, Valves, Flows, newPumps, dispatch, ChangeSteamFlow, ChangeSteam)
    }
    */
  })

export default SetPump
