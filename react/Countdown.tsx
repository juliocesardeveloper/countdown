import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick, getDaysFromNow } from './utils/time'

import { useCssHandles } from 'vtex.css-handles'

interface CountdownProps {
  targetDate: string
}

const CSS_HANDLES = [
  'countdown',
  'wrapper-days',
  'days',
  'name-days',
  'wrapper-hours',
  'hours',
  'name-hours',
  'wrapper-minutes',
  'minutes',
  'name-minutes',
  'wrapper-seconds',
  'seconds',
  'name-seconds'
] as const

const DEFAULT_TARGET_DATE = getDaysFromNow()

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ targetDate = DEFAULT_TARGET_DATE }) => {

  const [ timeRemaining, setTime ] = useState<TimeSplit>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const handles = useCssHandles(CSS_HANDLES)

  tick(targetDate, setTime)

  return (
    <div className={`${handles['countdown']}`}>
      <div className={`${handles['wrapper-days']}`}>
        {
          timeRemaining.days !== "00"
          ? <h1 className={`${handles['days']}`}>{timeRemaining.days}</h1>
          : ""
        }
        {
          timeRemaining.days !== "00"
          ? <p className={`${handles['name-days']}`}>Days</p>
          : ""
        }
        
      </div>
      <div className={`${handles['wrapper-hours']}`}>
        <h1 className={`${handles['hours']}`}>{timeRemaining.hours}</h1>
        <p className={`${handles['name-hours']}`}>Hours</p>
      </div>
      <div className={`${handles['wrapper-minutes']}`}>
        <h1 className={`${handles['minutes']}`}>{timeRemaining.minutes}</h1>
        <p className={`${handles['name-minutes']}`}>Minutes</p>
      </div>
      <div className={`${handles['wrapper-seconds']}`}>
        <h1 className={`${handles['seconds']}`}>{timeRemaining.seconds}</h1>
        <p className={`${handles['name-seconds']}`}>Seconds</p>
      </div>
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    targetDate: {
      title: 'Final date',
      description: 'Final date used in the countdown',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
