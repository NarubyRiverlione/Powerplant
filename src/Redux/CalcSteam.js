import { CstSteam, CstGenerator } from '../Cst'

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
export const Pressure = (Temp) => (
  Temp <= 100.0
    ? Formula(AntoinePressure.BelowBoiling, Temp)
    : Formula(AntoinePressure.AboveBoiling, Temp)
)

export const PressureBar = (pressure) => pressure / UnitConversion.Pressure_mmHG_Bar

export const SteamFlow = (SteamPressure) => {
  if (SteamPressure < CstSteam.BypassMinPressure) return 0
  const Flow = SteamPressure * CstSteam.FlowFactor + CstSteam.FlowCorrection
  return Flow < 0 ? 0 : Flow
}
export const FeedwaterFlow = (Steamflow, TurbineSteamIntake) => {
  // steam thats doesn't enter the turbine and doesn't flow back via the bypass valve is lost
  // bypass valve is rate for max CstSteam.BypassMaxFlow
  const steamNotUsed = Steamflow - TurbineSteamIntake
  const steamLoss = steamNotUsed < CstSteam.BypassMaxFlow ? 0 : steamNotUsed - CstSteam.BypassMaxFlow
  const feedFlow = Steamflow - steamLoss
  if (steamLoss > 0) console.warn(`Lossing steam = ${steamLoss} -> lossing feedwater, reactor lvl will drop`)
  return feedFlow
}

export const ReactorLevelChange = (Steamflow, FeedFlow) => {
  const Change = ((FeedFlow < 0 ? 0 : FeedFlow) - Steamflow) * CstSteam.ReactorLevelLossFactor
  console.log(`Reactor water lvl output: ${Steamflow}, input: ${FeedFlow} -->  change by: ${Change}`)
  return Change
}


export const BypassValve = (Steamflow, TurbineSteamIntake) => {
  let bypassOpenPct = ((Steamflow - TurbineSteamIntake) / CstSteam.BypassMaxFlow) * 100
  if (bypassOpenPct > 100) bypassOpenPct = 100
  if (bypassOpenPct < 0) bypassOpenPct = 0
  return bypassOpenPct
}

export const TurbineSteamIntake = (Steamflow, TurbineSetpoint) => {
  const Intake = Steamflow > TurbineSetpoint ? TurbineSetpoint : Steamflow
  return Intake
}

export const Generator = (TurbineSteam, Breaker, TurbineSpeed) => {
  if (TurbineSpeed !== 1800 || !Breaker) return 0
  const Output = TurbineSteam * CstGenerator.PowerFactor + CstGenerator.PowerCorrection
  return Output < 0 ? 0 : Output
}
