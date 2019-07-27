export const Actions = {
  // Reactor
  ReactorSetStartEnergy: 'REACTOR_START_ENERGY',
  EnergyAddDelta: 'REACTOR_CHANGE_ENERGY',
  ReactorTemp: 'REACTOR_CHANGE_TEMP',
  // Steam
  SteamTemp: 'STEAM_CHANGE_TEMP',
  SteamPressure: 'STEAM_CHANGE_PRESSURE',
  ToggleMSIV: 'MSIV_TOGGLE',
  // Valves & Pumps & Flows
  SetPump: 'PUMP_SET',
  ToggleValve: 'VALVE_TOGGLE',
  FlowChange: 'FLOW_CHANGE',
}


export const CstTiming = {
  EnergyChange: 1500,
  RecircPumpChange: 1000,
  SteamChange: 750,
}

export const CstChangeStep = {
  Energy: 0.05554,
  RecircPump: 100,
  // SteamTemp: 1,
}
export const CstReactor = {

  ColdTemp: 30,
  StartEnergy: {
    Cold: 0,
    BeforeBoiling: 69.43,
    Boiling: 69.98,
    BeforeOpeningBypass: 248.87,
    OpeningBypass: 248.93,
    Power100: 254.98,
  },
  TempOffset: 0.9,
}

export const CstSteam = {
  TempMinLoss: 8,
  TempLossFactor: 5,
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
