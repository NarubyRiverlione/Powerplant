export const CstNavScreens = {
  StartScreen: '/',
  HelpScreen: '/help',
  PowerplantScreen: '/powerplant',
}

export const Actions = {
  // Simulator
  SimReset: 'RESET_SIMULATOR ',
  SimSetup: 'SETUP_SIMULATOR',
  // Reactor
  ReactorSetStartEnergy: 'REACTOR_START_ENERGY',
  EnergyAddDelta: 'REACTOR_CHANGE_ENERGY',
  ReactorAddDeltaTemp: 'REACTOR_CHANGE_TEMP',
  ReactorLevelChange: 'REACTOR_CHANGE_LEVEL',
  ReactorLevelChangeTimer: 'STORE_REF_REACTOR_LEVEL_INTERVAL',
  ReactorRodsOut: 'RODS_OUT_REACTOR',
  ReactorRodSpeed: 'ROD_SPEED_REACTOR',
  ReactorRodAction: 'ROD_ACTION_REACTOR',
  // Steam
  ChangeSteam: 'STEAM_CHANGE',
  // SteamPressure: 'STEAM_CHANGE_PRESSURE',
  ToggleMSIV: 'MSIV_TOGGLE',
  // Valves & Pumps & Flows
  SetPump: 'PUMP_SET',
  ToggleValve: 'VALVE_TOGGLE',
  ValveFlowChange: 'VALVE_FLOW',
  // Pump
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
  FeedwaterPumpChange: 500,
  SteamChange: 750,
  TurbineRollup: 500,
  ReactorLevelUpdate: 1000,
  ValveChange: 1000,
}

export const CstChangeStep = {
  Energy: 0.05554,
  FeedwaterPump: 100,
  RecirculatePump: 100,
  TurbineRollup: 100,
  ValveChange: 20,
}

const CstStartupConditions = {
  Test: 'Test',
  Cold: 'Cold',
  BeforeBoiling: 'BeforeBoiling',
  Boiling: 'Boiling',
  BeforeSteamFlow: 'BeforeSteamFlow',
  Steam3MBL: 'Steam3MBL',
  GeneratorRunning: 'GeneratorRunning',
  // Power20: 'Power20',
  // Power100: 'Power100',
}
export const CstReactor = {
  RodSpeed1: 1,
  RodSpeed5: 5,
  RodSpeed10: 10,
  RodActionInsert: -1,
  RodActionIdle: 0,
  RodActionRetract: +1,
  ColdTemp: 30,
  StartEnergy: {
    [CstStartupConditions.Test]: 275.0,
    [CstStartupConditions.Cold]: 0,
    [CstStartupConditions.BeforeBoiling]: 69.89, // 83.03,
    [CstStartupConditions.Boiling]: 69.97, // 83.09,
    [CstStartupConditions.BeforeSteamFlow]: 251.36,
    [CstStartupConditions.Steam3MBL]: 253.93,
    [CstStartupConditions.GeneratorRunning]: 253.93,
    // [CstStartupConditions.Power20]: 261.32,
    // [CstStartupConditions.Power100]: 254.98,
  },
}


export const CstSteam = {
  TempLoss: 3.28,
  FlowFactor: 0.001740309723,
  FlowCorrection: -78.42,
  BypassMinPressure: 45041.81, // 60 bar
  BypassMaxFlow: 3,
  ReactorLevelChangeFactor: 0.000002,
  ReactorLevelLossFactor: 0.003,
}

export const CstGenerator = {
  PowerFactor: 64.8,
  PowerCorrection: 2.161,
}
export const CstPumps = {
  FeedwaterPump1: 'FeedwaterPump1',
  FeedwaterPump2: 'FeedwaterPump2',

  RecircLeftA: 'RecirculateLeftA',
  RecircLeftB: 'RecirculateLeftB',

  RecircRightA: 'RecirculateRightA',
  RecircRightB: 'RecirculateRightB',
}

export const CstIntakeValve = 'Intake'
export const CstOutputValve = 'Output'
export const CstValves = {
  [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: 'RecirculateLeftA_Intake',
  [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: 'RecirculateLeftA_Output',

  [`${CstPumps.RecircLeftB}_${CstIntakeValve}`]: 'RecirculateLeftB_Intake',
  [`${CstPumps.RecircLeftB}_${CstOutputValve}`]: 'RecirculateLeftB_Output',

  [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: 'RecirculateRightA_Intake',
  [`${CstPumps.RecircRightA}_${CstOutputValve}`]: 'RecirculateRightA_Output',

  [`${CstPumps.RecircRightB}_${CstIntakeValve}`]: 'RecirculateRightB_Intake',
  [`${CstPumps.RecircRightB}_${CstOutputValve}`]: 'RecirculateRightB_Output',


  [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 'FeedwaterPump1_Intake',
  [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 'FeedwaterPump1_Output',

  [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: 'FeedwaterPump2_Intake',
  [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: 'FeedwaterPump2_Output',
}

export const CstFlowMax = {
  Valve: 100,
  [`${CstIntakeValve}`]: 100,
  [`${CstOutputValve}`]: 100,

  [`${CstPumps.RecircLeftA}`]: 5000,
  [`${CstPumps.RecircLeftB}`]: 5000,

  [`${CstPumps.RecircRightA}`]: 5000,
  [`${CstPumps.RecircRightB}`]: 5000,

  [`${CstPumps.FeedwaterPump1}`]: 5000,
  [`${CstPumps.FeedwaterPump2}`]: 5000,
}

export const CstFlowMin = {
  Pump: 0,
  [`${CstIntakeValve}`]: 0,
  [`${CstOutputValve}`]: 0,
}

export const StartupConditions = {
  [CstStartupConditions.BeforeBoiling]: {
    RodsOut: 1260,
    TurbineSetpoint: 0,
    TurbineRollup: 0,
    GeneratorBreaker: false,
    Pumps: {
      [`${CstPumps.FeedwaterPump1}`]: false,
      [`${CstPumps.FeedwaterPump2}`]: false,
      [`${CstPumps.RecircLeftA}`]: false,
      [`${CstPumps.RecircLeftB}`]: false,
      [`${CstPumps.RecircRightA}`]: false,
      [`${CstPumps.RecircRightB}`]: false,
    },
    Valves: {
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: false,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: false,

      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: false,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: false,

      [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: false,
      [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: false,

      [`${CstPumps.RecircLeftB}_${CstIntakeValve}`]: false,
      [`${CstPumps.RecircLeftB}_${CstOutputValve}`]: false,

      [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: false,
      [`${CstPumps.RecircRightA}_${CstOutputValve}`]: false,

      [`${CstPumps.RecircRightB}_${CstIntakeValve}`]: false,
      [`${CstPumps.RecircRightB}_${CstOutputValve}`]: false,

    },
    Flows: {

      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 0,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 0,

      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: 0,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: 0,

      [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: 100,
      [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: 100,

      [`${CstPumps.RecircLeftB}_${CstIntakeValve}`]: 0,
      [`${CstPumps.RecircLeftB}_${CstOutputValve}`]: 0,

      [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: 100,
      [`${CstPumps.RecircRightA}_${CstOutputValve}`]: 0,

      [`${CstPumps.RecircRightB}_${CstIntakeValve}`]: 0,
      [`${CstPumps.RecircRightB}_${CstOutputValve}`]: 0,
    },
  },
  [CstStartupConditions.Boiling]: {
    RodsOut: 1262,
    TurbineSetpoint: 0,
    TurbineRollup: 0,
    GeneratorBreaker: false,
    Pumps: {
      [`${CstPumps.FeedwaterPump1}`]: false,
      [`${CstPumps.FeedwaterPump2}`]: false,
      [`${CstPumps.RecircLeftA}`]: true,
      [`${CstPumps.RecircLeftB}`]: false,
      [`${CstPumps.RecircRightA}`]: true,
      [`${CstPumps.RecircRightB}`]: false,
    },
    Valves: {
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: false,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: false,

      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: false,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: false,

      [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: true,
      [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: true,

      [`${CstPumps.RecircLeftB}_${CstIntakeValve}`]: false,
      [`${CstPumps.RecircLeftB}_${CstOutputValve}`]: false,

      [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: true,
      [`${CstPumps.RecircRightA}_${CstOutputValve}`]: true,

      [`${CstPumps.RecircRightB}_${CstIntakeValve}`]: false,
      [`${CstPumps.RecircRightB}_${CstOutputValve}`]: false,

    },
    Flows: {

      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 0,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 0,

      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: 0,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: 0,

      [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: 100,
      [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: 100,

      [`${CstPumps.RecircLeftB}_${CstIntakeValve}`]: 0,
      [`${CstPumps.RecircLeftB}_${CstOutputValve}`]: 0,

      [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: 100,
      [`${CstPumps.RecircRightA}_${CstOutputValve}`]: 100,

      [`${CstPumps.RecircRightB}_${CstIntakeValve}`]: 0,
      [`${CstPumps.RecircRightB}_${CstOutputValve}`]: 0,
    },
  },
  [CstStartupConditions.BeforeSteamFlow]: {
    TurbineSetpoint: 0,
    TurbineRollup: 0,
    GeneratorBreaker: false,
    Pumps: {
      [`${CstPumps.FeedwaterPump1}`]: true,
      [`${CstPumps.FeedwaterPump2}`]: false,
    },
    Valves: {
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: true,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: true,
      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: false,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: false,
    },
    Flows: {
      [CstPumps.FeedwaterPump1]: 5000,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 100,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 100,

      [CstPumps.FeedwaterPump2]: 0,
      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: 0,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: 0,
    },
  },
  [CstStartupConditions.Steam3MBL]: {
    TurbineSetpoint: 0,
    TurbineRollup: 0,
    GeneratorBreaker: false,
    Pumps: {
      [`${CstPumps.FeedwaterPump1}`]: true,
      [`${CstPumps.FeedwaterPump2}`]: false,
    },
    Valves: {
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: true,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: true,
      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: false,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: false,
    },
    Flows: {
      [CstPumps.FeedwaterPump1]: 5000,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 100,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 100,

      [CstPumps.FeedwaterPump2]: 0,
      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: 0,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: 0,
    },
  },
  [CstStartupConditions.GeneratorRunning]: {
    TurbineSetpoint: 5,
    GeneratorBreaker: true,
    TurbineRollup: 1800,
    Pumps: {
      [`${CstPumps.FeedwaterPump1}`]: true,
      [`${CstPumps.FeedwaterPump2}`]: false,
    },
    Valves: {
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: true,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: true,
      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: false,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: false,
    },
    Flows: {
      [CstPumps.FeedwaterPump1]: 5000,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 100,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 100,

      [CstPumps.FeedwaterPump2]: 0,
      [`${CstPumps.FeedwaterPump2}_${CstIntakeValve}`]: 0,
      [`${CstPumps.FeedwaterPump2}_${CstOutputValve}`]: 0,
    },
  },
}

export const CstText = {
  Title: 'Simple nuclear power plant',

  WelcomeTxt: {
    Welcome: 'Welcome to the simulator of a simple nuclear power plant',
    StartupConditions: 'Startup conditions',
    ChoiceStartup: 'Choice your start up condition',
    Choices: [
      { Name: CstStartupConditions.Cold, Title: 'Cold & dark reactor' },
      { Name: CstStartupConditions.BeforeBoiling, Title: 'Just before boiling reactor' },
      { Name: CstStartupConditions.Boiling, Title: 'Boiling reactor' },
      { Name: CstStartupConditions.BeforeSteamFlow, Title: 'Just before turbine flow' },
      { Name: CstStartupConditions.Steam3MBL, Title: 'Turbine flow 3 MBL/h' },
      { Name: CstStartupConditions.GeneratorRunning, Title: 'Generator running' },
      // { Name: CstStartupConditions.Power20, Title: 'Output at 20 % rated' },
      // { Name: CstStartupConditions.Power100, Title: 'Output at 100 % rated' },
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
    RodsOut: 'Control rods retracted',
    RodSpeed1: 'Slow',
    RodSpeed5: 'Medium',
    RodSpeed10: 'Fast',
    RodSpeedTxt: 'Rod speed',
    RodActionTxt: 'Action',
    RodRetract: 'Retract',
    RodInsert: 'Insert',
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

  RecirculationTxt: {
    Title: 'recirculation pumps',

    Steamdrum: 'Steam drum',
    Temp: 'Temp',
    TempUnit: '°C',
    Pressure: 'Pressure',
    PressureUnit: 'bar',

    CircuitLeft: 'Left circuit',
    PumpLA: 'Pump A',
    PumpLB: 'Pump B',

    CircuitRight: 'Right circuit',
    PumpRA: 'Pump A',
    PumpRB: 'Pump B',

    Valves: 'Valves',
    Level: 'Level',
    Flow: 'Flow',
  },

  FeedwaterTxt: {
    Title: 'Feedwater pumps',
    Pump1: 'Pump 1',
    Pump2: 'Pump 2',
    Valves: 'Valves',
    Level: 'Level',
    Flow: 'Flow',
  },

  SteamTxt: {
    Title: 'Main Steam System',
    MSIV: 'Main Steamline Isolation Valve',

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
