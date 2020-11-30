/* eslint-disable camelcase */
import {
  CstPumps, CstIntakeValve, CstOutputValve, CstStartupConditions,
} from '../Cst'

const RecirculationPumps_A = {
  [`${CstPumps.RecircLeftA}`]: true,
  [`${CstPumps.RecircRightA}`]: true,
}
const RecirculationValves_A = {
  [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: true,
  [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: true,
  [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: true,
  [`${CstPumps.RecircRightA}_${CstOutputValve}`]: true,
}

const RecirculationFlows_A = {
  [`${CstPumps.RecircLeftA}_${CstIntakeValve}`]: 100,
  [`${CstPumps.RecircLeftA}_${CstOutputValve}`]: 100,
  [`${CstPumps.RecircRightA}_${CstIntakeValve}`]: 100,
  [`${CstPumps.RecircRightA}_${CstOutputValve}`]: 100,
}

const StartupConditions = {
  [CstStartupConditions.BeforeBoiling]: {
    StartEnergy: 69.89,
    RodsOut: 1260,
    TurbineSetpoint: 0,
    TurbineRollup: 0,
    GeneratorBreaker: false,
    Pumps: RecirculationPumps_A,
    Valves: RecirculationValves_A,
    Flows: RecirculationFlows_A,
  },
  [CstStartupConditions.Boiling]: {
    StartEnergy: 75.99,
    RodsOut: 1370,
    TurbineSetpoint: 0,
    TurbineRollup: 0,
    GeneratorBreaker: false,
    Pumps: RecirculationPumps_A,
    Valves: RecirculationValves_A,
    Flows: RecirculationFlows_A,
  },
  [CstStartupConditions.BeforeSteamFlow]: {
    StartEnergy: 251.41,
    RodsOut: 0,
    TurbineSetpoint: 0,
    TurbineRollup: 0,
    GeneratorBreaker: false,
    Pumps: {
      ...RecirculationPumps_A,
      [`${CstPumps.FeedwaterPump1}`]: true,
    },
    Valves: {
      ...RecirculationValves_A,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: true,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: true,
    },
    Flows: {
      ...RecirculationFlows_A,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 100,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 100,
    },
  },
  [CstStartupConditions.Steam3MBL]: {
    StartEnergy: 253.93,
    RodsOut: 0,
    TurbineSetpoint: 0,
    TurbineRollup: 0,
    GeneratorBreaker: false,
    Pumps: {
      ...RecirculationPumps_A,
      [`${CstPumps.FeedwaterPump1}`]: true,
    },
    Valves: {
      ...RecirculationValves_A,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: true,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: true,
    },
    Flows: {
      ...RecirculationFlows_A,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 100,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 100,
    },
  },
  [CstStartupConditions.GeneratorRunning]: {
    StartEnergy: 253.93,
    RodsOut: 0,
    TurbineSetpoint: 5,
    GeneratorBreaker: true,
    TurbineRollup: 1800,
    Pumps: {
      ...RecirculationPumps_A,
      [`${CstPumps.FeedwaterPump1}`]: true,
    },
    Valves: {
      ...RecirculationValves_A,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: true,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: true,
    },
    Flows: {
      ...RecirculationFlows_A,
      [`${CstPumps.FeedwaterPump1}_${CstIntakeValve}`]: 100,
      [`${CstPumps.FeedwaterPump1}_${CstOutputValve}`]: 100,
    },
  },
}

export default StartupConditions
