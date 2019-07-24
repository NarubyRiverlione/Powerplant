export const Actions = {
  ReactorSetStartEnergy: 'REACTOR_START_ENERGY',
  EnergyAddDelta: 'REACTOR_CHANGE_ENERGY',
  ReactTempAddDelta: 'REACTOR_CHANGE_TEMP',
  ReactorPressureCalc: 'REACTOR_CALC_PRESSURE',
}

export const CstTiming = {
  EnergyChange: 500,
}

export const CstReactor = {
  EnergyStep: 0.05554,
  ColdTemp: 30,
  StartEnergy: {
    Cold: 0,
    BeforeBoiling: 69.43,
    Boiling: 69.98,
    BeforeOpeningBypass: 248.87,
    OpeningBypass: 248.93,
    Power100: 254.98,
  },
}


export const UnitConversion = {
  Pressure_mmHG_Bar: 750.06,
}

export const CstText = {
  Title: 'Nuclear power plant',
  ReactorTxt: {
    Energy: 'Energy',
    Temp: 'Temp',
    TempUnit: '°C',
    Pressure: 'Pressure',
    PressureUnit: 'bar',
  },
}
