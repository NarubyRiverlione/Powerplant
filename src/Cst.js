export const CstNavScreens = {
  StartScreen: '/',
  HelpScreen: '/help',
  PowerplantScreen: '/powerplant',
}

export const Actions = {
  // Simulator
  SimReset: 'RESET_SIMULATOR ',
  // Reactor
  ReactorSetStartEnergy: 'REACTOR_START_ENERGY',
  EnergyAddDelta: 'REACTOR_CHANGE_ENERGY',
  ReactorAddDeltaTemp: 'REACTOR_CHANGE_TEMP',
  ReactorLevelChange: 'REACTOR_CHANGE_LEVEL',
  ReactorLevelChangeTimer: 'STORE_REF_REACTOR_LEVEL_INTERVAL',
  // Steam
  ChangeSteam: 'STEAM_CHANGE',
  // SteamPressure: 'STEAM_CHANGE_PRESSURE',
  ToggleMSIV: 'MSIV_TOGGLE',
  // Valves & Pumps & Flows
  SetPump: 'PUMP_SET',
  ToggleValve: 'VALVE_TOGGLE',
  FlowChange: 'FLOW_CHANGE',
  // Turbine
  TurbineSetpointChange: 'TURBINE_SETPOINT_CHANGE',
  TurbineSetRollup: 'TURBINE_SET_ROLLUP',
  TurbineSpeed: 'TURBINE_SPEED',
  // Generator
  GeneratorBreaker: 'GENERATOR_BREAKER',
}

export const CstTiming = {
  EnergyChange: 1000,
  RecircPumpChange: 500,
  SteamChange: 750,
  TurbineRollup: 500,
  ReactorLevelUpdate: 1000,
}

export const CstChangeStep = {
  Energy: 0.05554,
  RecircPump: 100,
  TurbineRollup: 100,
}

const CstStartupScenarios = {
  Test: 'Test',
  Cold: 'Cold',
  BeforeBoiling: 'BeforeBoiling',
  Boiling: 'Boiling',
  BeforeOpeningBypass: 'BeforeOpeningBypass',
  OpeningBypass: 'OpeningBypass',
  Power20: 'Power20',
  Power100: 'Power100',
}
export const CstReactor = {
  ColdTemp: 30,
  StartEnergy: {
    [CstStartupScenarios.Test]: 275.0,
    [CstStartupScenarios.Cold]: 0,
    [CstStartupScenarios.BeforeBoiling]: 83.03,
    [CstStartupScenarios.Boiling]: 83.09,
    [CstStartupScenarios.BeforeOpeningBypass]: 257.98,
    [CstStartupScenarios.OpeningBypass]: 258.04,
    [CstStartupScenarios.Power20]: 261.32,
    [CstStartupScenarios.Power100]: 254.98,
  },
}

export const CstSteam = {
  TempLoss: 3.28,
  FlowFactor: 0.001740309723,
  FlowCorrection: -78.42,
  BypassMinPressure: 45041.81, // 60 bar
  BypassMaxFlow: 3,
  ReactorLevelChangeFactor: 0.000002,
  ReactorLevelGainFactor: 0.2,
}

export const CstGenerator = {
  PowerFactor: 64.8,
  PowerCorrection: 2.161,
}
export const CstPumps = {
  RecircPump1: 'RecircPump1',
  RecircPump2: 'RecircPump2',
  FeedPump1: 'FeedPump1',
  FeedPump2: 'FeedPump2',
}

export const CstIntakeValve = 'Intake'
export const CstOutputValve = 'Output'
export const CstValves = {
  [`${CstPumps.RecircPump1}_${CstIntakeValve}`]: 'RecircPump1_Intake',
  [`${CstPumps.RecircPump1}_${CstOutputValve}`]: 'RecircPump1_Output',
  [`${CstPumps.RecircPump2}_${CstIntakeValve}`]: 'RecircPump2_Intake',
  [`${CstPumps.RecircPump2}_${CstOutputValve}`]: 'RecircPump2_Output',
  [`${CstPumps.FeedPump1}_${CstIntakeValve}`]: 'FeedPump1_Intake',
  [`${CstPumps.FeedPump1}_${CstOutputValve}`]: 'FeedPump1_Output',
  [`${CstPumps.FeedPump2}_${CstIntakeValve}`]: 'FeedPump2_Intake',
  [`${CstPumps.FeedPump2}_${CstOutputValve}`]: 'FeedPump2_Output',
}

export const CstFlowMax = {
  [`${CstPumps.RecircPump1}`]: 5000,
  [`${CstPumps.RecircPump2}`]: 5000,
  [`${CstPumps.FeedPump1}`]: 1000,
  [`${CstPumps.FeedPump2}`]: 1000,
}

export const CstText = {
  Title: 'Simple nuclear power plant',

  WelcomeTxt: {
    Welcome: 'Welcome to the simulator of a simple nuclear power plant',
    StartupScenarios: 'Startup scenarios',
    ChoiceStartup: 'Choice your start up senario',
    Choices: [
      { Name: CstStartupScenarios.Cold, Title: 'Cold & dark reactor' },
      { Name: CstStartupScenarios.BeforeBoiling, Title: 'Just before boiling reactor' },
      { Name: CstStartupScenarios.Boiling, Title: 'Boiling reactor' },
      { Name: CstStartupScenarios.BeforeOpeningBypass, Title: 'Just before opening turbine bypass valve' },
      { Name: CstStartupScenarios.OpeningBypass, Title: 'Opened bypass valve' },
      { Name: CstStartupScenarios.Power20, Title: 'Output at 20 % rated' },
      { Name: CstStartupScenarios.Power100, Title: 'Output at 100 % rated' },
    ],
    HelpScreenTitle: 'Explication',
    HelpScreenLink: 'Read help',
  },
  SimControlsTxt: {
    PauzeBtn: 'Pause the simulation',
    ReturnBtn: 'Back to start screen',
  },

  ReactorTxt: {
    Title: 'Reactor',
    Energy: 'Energy',
    Temp: 'Core temp',
    TempUnit: '°C',
    Level: 'Cooling level',
  },

  TurbineTxt: {
    Title: 'Turbine',
    SteamFlow: 'Steam flow',
    SteamFlowUnit: 'MBL/h',
    BypassValve: 'Bypass valve',
    Speed: 'Speed control',
    Pressure: 'Pressure',
    Setpoint: 'Setpoint',
    Rollup: 'Rollup',
    RollupOff: 'Off',
    Rollup900: '900',
    Rollup1800: '1800',
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

    Temp: 'Steam temp',
    TempUnit: '°C',
    Pressure: 'Steam pressure',
    PressureUnit: 'bar',
  },

  GeneratorTxt: {
    Title: 'Generator',
    Power: 'Power',
    PowerUnit: 'MW',
    Breaker: 'Breaker',
    Open: 'Open',
    Closed: 'Closed',
  },
}
