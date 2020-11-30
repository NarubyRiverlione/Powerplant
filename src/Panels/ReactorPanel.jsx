import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-reflex-grid'
import { ChangeRodSpeed, SetRodAction } from '../Redux/ActionsReactor'

import Display from '../Components/ControlElements/Display'
import Button from '../Components/ControlElements/Button'
import { CstText, CstReactor } from '../Cst'

const { ReactorTxt } = CstText
const ReactorPanel = () => {
  const dispatch = useDispatch()
  const {
    Energy, ReactorTemp, RodsOut, RodSpeed, RodAction,
  } = useSelector((state) => ({
    Energy: state.Energy,
    ReactorTemp: state.ReactorTemp,

    RodsOut: state.RodsOut,
    RodSpeed: state.RodSpeed,
    RodAction: state.RodAction,
  }))

  return (
    <React.Fragment>
      <Row>
        <Col size={6} md>
          <Display
            Title={ReactorTxt.RodsOut}
            Text={RodsOut.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            Width={80}
          />
        </Col>
        <Col size={3} md>
          <Display
            Title={ReactorTxt.Energy}
            Text={Energy.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            Width={100}
          />
        </Col>
        <Col size={3} md>
          <Display
            Title={ReactorTxt.Temp}
            Text={ReactorTemp.toLocaleString(undefined, { maximumFractionDigits: 1 })}
            Width={70}
            Suffix={ReactorTxt.TempUnit}
          />
        </Col>
        {/*
          <Col size={3} md>
          <Display
          Title={ReactorTxt.Level}
          Text={ReactorLevel.toLocaleString(undefined, { maximumFractionDigits: 1 })}
          Width={50}
          />
          </Col>
        */}
      </Row>

      <Row>
        <Col auto md>
          <Row justify-space-around>
            <Col size={3}>
              <div className="title">{ReactorTxt.RodSpeedTxt}</div>
            </Col>
            <Col size={3}>
              <Button
                Width={80}
                Caption={ReactorTxt.RodSpeed1}
                cb={() => dispatch(ChangeRodSpeed(CstReactor.RodSpeed1))}
                SetPressed={RodSpeed === CstReactor.RodSpeed1}
              />
            </Col>
            <Col size={3}>
              <Button
                Width={80}
                Caption={ReactorTxt.RodSpeed5}
                cb={() => dispatch(ChangeRodSpeed(CstReactor.RodSpeed5))}
                SetPressed={RodSpeed === CstReactor.RodSpeed5}
              />
            </Col>
            <Col size={3}>
              <Button
                Width={80}
                Caption={ReactorTxt.RodSpeed10}
                cb={() => dispatch(ChangeRodSpeed(CstReactor.RodSpeed10))}
                SetPressed={RodSpeed === CstReactor.RodSpeed10}
              />
            </Col>
          </Row>
        </Col>

        <Col auto md>
          <Row justify-space-around>
            <Col size={3}>
              <div className="title">{ReactorTxt.RodActionTxt}</div>
            </Col>
            <Col size={3}>
              <Button
                Width={80}
                Caption={ReactorTxt.RodRetract}
                cb={() => dispatch(SetRodAction(CstReactor.RodActionRetract))}
                SetPressed={RodAction === CstReactor.RodActionRetract}
              />
            </Col>
            <Col size={3}>
              <Button
                Width={80}
                Caption={ReactorTxt.RodInsert}
                cb={() => dispatch(SetRodAction(CstReactor.RodActionInsert))}
                SetPressed={RodAction === CstReactor.RodActionInsert}
              />
            </Col>
          </Row>
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default ReactorPanel
