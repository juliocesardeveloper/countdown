import { TimeSplit } from '../typings/global'

const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE
const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR

const fillWithZero = (digits: number, number: number): string => {
  const filled = `${'0'.repeat(digits - 1)}${number}`

  return filled.slice(filled.length - digits)
}

export const parseTimeRemaining = (totalSeconds: number): TimeSplit => {
  const days = Math.floor(totalSeconds / SECONDS_IN_DAY)
  const hours = Math.floor(totalSeconds / SECONDS_IN_HOUR) - (days * 24)
  const minutes = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
  )
  const seconds = Math.floor(
    (totalSeconds % SECONDS_IN_HOUR) % SECONDS_IN_MINUTE
  )

  return {
    days: fillWithZero(2, days),
    hours: fillWithZero(2, hours),
    minutes: fillWithZero(2, minutes),
    seconds: fillWithZero(2, seconds),
  }
}

/**
 *
 * @param targetDate ISOString for the date that the countdown will expire
 * @param dispatchFn A function that updates the state of the component
 */
export const tick = (
  targetDate: string,
  dispatchFn: React.Dispatch<React.SetStateAction<TimeSplit>>
) => {
  const ONE_SECOND_IN_MILLIS = 1000
  const finalDate = new Date(targetDate)
  const now = new Date()

  const secondsLeft =
    (finalDate.getTime() - now.getTime()) / ONE_SECOND_IN_MILLIS

  setTimeout(() => {
    dispatchFn(parseTimeRemaining(secondsLeft))
  }, ONE_SECOND_IN_MILLIS)
}

export const getDaysFromNow = () => {
  const today = new Date()

  today.setDate(today.getDate() + 10)

  return today.toISOString()
}
