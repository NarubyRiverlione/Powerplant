import { Steam, Generator } from '../Cst'

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
export const CalcPressure = Temp => (
  Temp <= 100.0
    ? Formula(AntoinePressure.BelowBoiling, Temp)
    : Formula(AntoinePressure.AboveBoiling, Temp)
)

export const PressureBar = pressure => pressure / UnitConversion.Pressure_mmHG_Bar

export const CalcFlow = (Pressure) => {
  if (Pressure < Steam.BypassMinPressure) return 0
  const Flow = Pressure * Steam.FlowFactor + Steam.FlowCorrection
  return Flow
}

export const CalcBypassValve = (SteamFlow, TurbineSteamIntake) => {
  let bypass = (SteamFlow - TurbineSteamIntake) / Steam.BypassMaxFlow * 100
  if (bypass > 100) bypass = 100
  if (bypass < 0) bypass = 0
  return bypass
}

export const CalcTurbineSteamIntake = (SteamFlow, TurbineSetpoint) => {
  const Intake = SteamFlow > TurbineSetpoint ? TurbineSetpoint : SteamFlow
  return Intake
}

export const CalcGenerator = (TurbineSteamIntake) => {
  if (TurbineSteamIntake <= 0) return 0
  const Output = TurbineSteamIntake * Generator.PowerFactor + Generator.PowerCorrection
  return Output < 0 ? 0 : Output
}
