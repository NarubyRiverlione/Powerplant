export const Actions = {
  ReactorSetStartEnergy: 'REACTOR_START_ENERGY',
  EnergyAddDelta: 'REACTOR_CHANGE_ENERGY',
  ReactTempAddDelta: 'REACTOR_CHANGE_TEMP',
  SteamTemp: 'STEAM_TEMP',
  SteamPressureCalc: 'STEAM_CALC_PRESSURE',
  ToggleMSIV: 'MSIV_TOGGLE',
  SetPump: 'PUMP_SET',
  ToggleValve: 'VALVE_TOGGLE',
  SetFlow: 'SET_FLOW',
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

export const CstIntakeValve = 'Intake'
export const CstOutputValve = 'Output'
export const CstValves = {
  [`${CstPumps.RecircPump1}_${CstIntakeValve}`]: 'RecircPump1_Intake',
  [`${CstPumps.RecircPump1}_${CstOutputValve}`]: 'RecircPump1_Output',
  [`${CstPumps.RecircPump2}_${CstIntakeValve}`]: 'RecircPump2_Intake',
  [`${CstPumps.RecircPump2}_${CstOutputValve}`]: 'RecircPump2_Output',
}

export const CstFlowMax = {
  [`${CstPumps.RecircPump1}`]: 5000,
  [`${CstPumps.RecircPump2}`]: 5000,
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
    CstIntakeValve: 'Intake',
    CstOutputValve: 'Output',
    Valves: 'Valves',
    Level: 'Level',
    Flow: 'Flow',
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
