const ChangeOverTime = (IntervalTime, Step, DeltaWanted, StepCb, RandomChange = true) => {
  let Changed = 0
  // keep changing energy until delta is reached
  const RefInterval = setInterval(() => {
    // will next step overflow DoneValue --> final step only what still needed
    // console.log(`still have ${Math.abs(DeltaWanted) - Changed + Step} change todo`)

    if (Math.abs(DeltaWanted) - Math.abs(Changed + Step) < Number.EPSILON) {
      // finale step
      // console.log(`todo: ${Math.abs(DeltaWanted) - Changed + Step}`)

      const FinalStep = DeltaWanted - Changed
      // console.log(`FinalStep ${FinalStep}`)
      StepCb(FinalStep)
      clearInterval(RefInterval)

      return
    }
    const step = RandomChange ? Math.floor(Math.random() * Step) : Step
    Changed += step

    StepCb(step)
  }, IntervalTime)
}

export default ChangeOverTime
