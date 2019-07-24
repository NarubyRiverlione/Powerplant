export const Actions = {
  ReactorSetStartEnergy: 'REACTOR_START_ENERGY',
  EnergyAddDelta: 'REACTOR_CHANGE_ENERGY',
  ReactTempAddDelta: 'REACTOR_CHANGE_TEMP',
  SteamTemp: 'STEAM_TEMP',
  SteamPressureCalc: 'STEAM_CALC_PRESSURE',
  ToggleMSIV: 'MSIV_TOGGLE',
  SetPump: 'PUMP_SET',
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
export const CstPumps = {
  RecircPump1: 'RecircPump1',
  RecircPump2: 'RecircPump2',
}

export const CstText = {
  Title: 'Nuclear power plant',
  ReactorTxt: {
    Title: 'Reactor',
    Energy: 'Energy',
    Temp: 'Temp',
    TempUnit: '°C',
  },
  TurbineTxt: {
    Title: 'Turbine',
  },
  RecirculateTxt: {
    Title: 'Recirculate pumps',
    Pump1: 'Pump 1',
    Pump2: 'Pump 2',
  },
  SteamTxt: {
    Title: 'Main Steam System',
    MSIV: 'Main Steamline Isolation Valve',

    Temp: 'Temp',
    TempUnit: '°C',
    Pressure: 'Pressure',
    PressureUnit: 'bar',
  },
}
