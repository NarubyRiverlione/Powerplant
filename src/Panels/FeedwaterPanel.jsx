import React from 'react'
import { Col, Row } from 'react-reflex-grid'

import { useSelector } from 'react-redux'
import Pump from '../Components/Pump'
import { CstPumps, CstText } from '../Cst'
import Display from '../Components/ControlElements/Display'

const FeedwaterPanel = () => {
  const HotwellLevel = useSelector((state) => state.HotwellLevel)
  return (
    <Row>
      <Col size={4} md>
        <Pump PumpName={CstPumps.FeedwaterPump1} Title={CstText.FeedwaterTxt.Pump1} />
      </Col>

      <Col size={4} md>
        <Row>
          <Col size={4}>
            <div className="text">
              {CstText.FeedwaterTxt.HotwellLevel}
            </div>
          </Col>

          <Col auto>
            <Display
              Text={(HotwellLevel).toLocaleString(undefined, { maximumFractionDigits: 1 })}
              Width={70}

            />
          </Col>
        </Row>
      </Col>

      <Col size={4} md>
        <Pump PumpName={CstPumps.FeedwaterPump2} Title={CstText.FeedwaterTxt.Pump2} />
      </Col>
    </Row>
  )
}


export default FeedwaterPanel
