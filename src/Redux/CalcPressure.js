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


const CalcPressure = Temp => (
  Temp <= 100.0
    ? Formula(AntoinePressure.BelowBoiling, Temp)
    : Formula(AntoinePressure.AboveBoiling, Temp)
)

export const PressureBar = pressure => pressure / UnitConversion.Pressure_mmHG_Bar

export default CalcPressure
