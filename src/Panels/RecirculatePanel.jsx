import React from 'react'
import { CstPumps, CstText } from '../Cst'

import RecirculatePump from '../Components/RecirculatePump'


const RecirculatePanel = () => (
  <div className="d-flex flex-row justify-content-around">
    <RecirculatePump PumpName={CstPumps.RecircPump1} Title={CstText.RecirculateTxt.Pump1} />
    <RecirculatePump PumpName={CstPumps.RecircPump2} Title={CstText.RecirculateTxt.Pump2} />
  </div>
)


export default RecirculatePanel
