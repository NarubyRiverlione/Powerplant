const ChangeOverTime = (IntervalTime, Step, DeltaWanted, StepCb, RandomChange = true, DoneCb) => {
  let Changed = 0
  // keep changing energy until delta is reached
  const RefInterval = setInterval(() => {
    // will next step overflow DoneValue --> final step only what still needed
    // console.log(`will change by max ${Step} to ${Math.abs(Changed) - Math.abs(Step)} with target of ${DeltaWanted}`)


    if ((DeltaWanted - Math.abs(Changed) - Math.abs(Step)) < Number.EPSILON) {
      // finale step
      // console.log(`todo: ${DeltaWanted - Changed}`)

      const FinalStep = (DeltaWanted - Math.abs(Changed)) * Math.sign(Step)
      // console.log(`FinalStep ${FinalStep}`)
      StepCb(FinalStep)
      clearInterval(RefInterval)
      // if there is a callback provided when done, do it now
      if (DoneCb) DoneCb()
      return
    }
    const step = RandomChange ? Math.floor(Math.random() * Step) : Step
    Changed += step

    StepCb(step)
  }, IntervalTime)
}

export default ChangeOverTime
