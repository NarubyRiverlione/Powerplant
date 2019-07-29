export const Actions = {
  // Reactor
  ReactorSetStartEnergy: 'REACTOR_START_ENERGY',
  EnergyAddDelta: 'REACTOR_CHANGE_ENERGY',
  ReactorAddDeltaTemp: 'REACTOR_CHANGE_TEMP',
  // Steam
  ChangeSteam: 'STEAM_CHANGE',
  // SteamPressure: 'STEAM_CHANGE_PRESSURE',
  ToggleMSIV: 'MSIV_TOGGLE',
  // Valves & Pumps & Flows
  SetPump: 'PUMP_SET',
  ToggleValve: 'VALVE_TOGGLE',
  FlowChange: 'FLOW_CHANGE',
}


export const CstTiming = {
  EnergyChange: 750,
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
    Test: 275.0,
    Cold: 0,
    BeforeBoiling: 83.03,
    Boiling: 83.09,
    BeforeOpeningBypass: 257.98,
    OpeningBypass: 258.04,
    Power20: 261.32,
    Power100: 254.98,
  },
}

export const CstSteam = {
  TempLoss: 3.28,
  FlowFactor: 0.001740309723,
  FlowCorrection: -78.42,
  BypassMinPressure: 45041.81, // 60 bar
  BypassMaxFlow: 3,
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
    SteamFlow: 'Steam flow',
    SteamFlowUnit: 'MBL/h',
    BypassValve: 'Bypass valve',
    Speed: 'Speed',
    Pressure: 'Pressure',
  },
  RecirculateTxt: {
    Title: 'Recirculate pumps',
    Pump1: 'Circuit 1',
    Pump2: 'Circuit 2',
    CstIntakeValve: 'Inlet',
    CstOutputValve: 'Outlet',
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
