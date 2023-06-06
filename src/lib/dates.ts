import { format } from 'date-fns'

interface DateObject {
  hours: number
  minutes: number
  seconds: number
}

export const parseDuration = (duration: string): DateObject | null => {
  console.log('duration: ', duration)
  const regex = /PT(\d+)H(?:(\d+)M)?([\d.]+)S/
  const matches = duration.match(regex)

  if (matches) {
    const hours = parseInt(matches[1])
    const minutes = matches[2] ? parseInt(matches[2]) : 0
    const seconds = parseFloat(matches[3])

    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }
  }

  return null
}

export const addDurationToDate = (duration: DateObject | null): Date | null => {
  if (duration) {
    const firstDate = new Date(0)
    const transformedDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate(),
      firstDate.getHours() + duration.hours,
      firstDate.getMinutes() + duration.minutes,
      firstDate.getSeconds() + duration.seconds
    )

    return transformedDate
  }

  return null
}

export const getDurationTime = (duration: string) => {
  const parsedDuration = parseDuration(duration)
  const transformedDate = addDurationToDate(parsedDuration)
  if (!transformedDate) return duration
  return transformedDate
}

export const addZero = (num: number): string => {
  let result = num.toString()
  if (num < 10) {
    result = '0' + result
  }
  return result
}

export const getDurationHoursMinutesSecondes = (duration: Date): string => {
  const hours = duration.getUTCHours()
  const minutes = duration.getUTCMinutes()
  const seconds = duration.getUTCSeconds()
  const result =
    addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds)
  return result
}

export const formatDate = (date: string): string => {
  try {
    const formatDate = new Date(date)
    return format(formatDate, 'HH:mm:ss')
  } catch (error) {
    try {
      const duration = getDurationTime(date)
      if (!(duration instanceof Date)) return duration
      const result = getDurationHoursMinutesSecondes(duration)
      return result
    } catch (error) {
      return date
    }
  }
}
