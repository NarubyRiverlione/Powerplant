const ChangeOverTime = (IntervalTime, Step, DeltaWanted, StepCb, DoneCb) => {
  let Changed = 0
  // keep changing energy until delta is reached
  const RefInterval = setInterval(() => {
    // will next step overflow DoneValue --> final step only what still needed
    console.log(`next will be  ${Math.abs(DeltaWanted) - Changed + Step}`)

    if (Math.abs(DeltaWanted) - Math.abs(Changed + Step) < Number.EPSILON) {
      // finale step
      // console.log(`todo: ${Math.abs(DeltaWanted) - Changed + Step}`)

      const FinalStep = DeltaWanted - Changed
      // console.log(`FinalStep ${FinalStep}`)
      StepCb(FinalStep)
      clearInterval(RefInterval)
      if (DoneCb) DoneCb()
      return
    }

    Changed += Step

    StepCb(Step)
  }, IntervalTime)
}

export default ChangeOverTime
