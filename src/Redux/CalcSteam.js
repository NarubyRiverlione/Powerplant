import {
  CstSteam, CstGenerator, CstPumps, Actions, CstTiming,
} from '../Cst'

export const UnitConversion = {
  Pressure_mmHG_Bar: 750.06,
}

// Antoine_pressure mmHG = 10^[A - (B / (C + temperature °C))]
const AntoinePressure = {
  BelowBoiling: {
    A: 8.07131, B: 1730.63, C: 233.426,
  },
  AboveBoiling: {
    A: 8.14019, B: 1810.94, C: 244.485,
  },
}

// eslint-disable-next-line
const Formula = (Antione, T) => Math.pow(10, (Antione.A - (Antione.B / (Antione.C + T))))

// return pressure in mmHG
export const CalcPressureViaTemp = (Temp) => (
  Temp <= 100.0
    ? Formula(AntoinePressure.BelowBoiling, Temp)
    : Formula(AntoinePressure.AboveBoiling, Temp)
)

export const PressureBar = (pressure) => pressure / UnitConversion.Pressure_mmHG_Bar

// count pumps that are running & output valve is complete open
const CountPumpsOperating = (pumps, containsName) => {
  const runningPumps = Object.keys(pumps).filter((name) => name.includes(containsName) && pumps[name])
  return runningPumps.length
}
// calculated the used recirculation vs the max
const RecircFlowFactor = (Pumps) => {
  const AmountRecircPumps = CountPumpsOperating(Pumps, 'Recirc')
  const Factor = AmountRecircPumps / 4
  // console.log(`Recirculation factor: ${Factor}`)
  return Factor
}

// Change steam temp & pressure in the steam drum
// Steam can only by created when a recirculation pump is running
// steam temp is based on reactor temp - Loss
export const ChangeSteamOverTime = (Pumps, dispatch) => {
  if (Pumps[CstPumps.RecircLeftA] || Pumps[CstPumps.RecircLeftB]
    || Pumps[CstPumps.RecircRightA] || Pumps[CstPumps.RecircRightB]) {
    const Loss = CstSteam.TempLoss / RecircFlowFactor(Pumps)
    // console.log(`Temp loss reactor <-> steam drum = ${Loss}`)

    setTimeout(() => {
      dispatch({ type: Actions.ChangeSteam, Loss })
    }, CstTiming.SteamChange)
  }
}

// Change the steam flow from the drum to the turbine
export const SetSteamFlow = (FlowChangeBy, PumpName, dispatch) => {
  // console.log(`Steam flow change by:${FlowChangeBy}`)
  dispatch({
    type: Actions.FlowChange,
    PumpName,
    FlowChangeBy,
  })
}

export const CalcSteamFlow = (SteamPressure) => {
  if (SteamPressure < CstSteam.BypassMinPressure) return 0
  const Flow = SteamPressure * CstSteam.FlowFactor + CstSteam.FlowCorrection
  return Flow < 0 ? 0 : Flow
}

export const CalcFeedwaterFlow = (Steamflow, TurbineSteamIntake) => {
  // steam thats doesn't enter the turbine and doesn't flow back via the bypass valve is lost
  // bypass valve is rate for max CstSteam.BypassMaxFlow
  const steamNotUsed = Steamflow - TurbineSteamIntake
  const steamLoss = steamNotUsed < CstSteam.BypassMaxFlow ? 0 : steamNotUsed - CstSteam.BypassMaxFlow
  const feedFlow = Steamflow - steamLoss
  if (steamLoss > 0) console.warn(`Lossing steam = ${steamLoss} -> lossing feedwater, reactor lvl will drop`)
  return feedFlow
}

export const CalcReactorLevelChange = (Steamflow, FeedFlow) => {
  const Change = ((FeedFlow < 0 ? 0 : FeedFlow) - Steamflow) * CstSteam.ReactorLevelLossFactor
  console.log(`Reactor water lvl output: ${Steamflow}, input: ${FeedFlow} -->  change by: ${Change}`)
  return Change
}

export const CalcBypassValveOpen = (Steamflow, TurbineSteamIntake) => {
  let bypassOpenPct = ((Steamflow - TurbineSteamIntake) / CstSteam.BypassMaxFlow) * 100
  if (bypassOpenPct > 100) bypassOpenPct = 100
  if (bypassOpenPct < 0) bypassOpenPct = 0
  return bypassOpenPct
}

export const CalcTurbineSteamIntake = (Steamflow, TurbineSetpoint) => {
  const Intake = Steamflow > TurbineSetpoint ? TurbineSetpoint : Steamflow
  return Intake
}

export const CalcGeneratorOutput = (TurbineSteam, Breaker, TurbineSpeed) => {
  if (TurbineSpeed !== 1800 || !Breaker) return 0
  const Output = TurbineSteam * CstGenerator.PowerFactor + CstGenerator.PowerCorrection
  return Output < 0 ? 0 : Output
}
