export const getWeatherType = (weatherMain, description) => {
  const main = weatherMain.toLowerCase()
  const desc = description?.toLowerCase()

  if (main === 'clear') return 'clear'

  if (main === 'clouds') {
    if (desc.includes('few') || desc.includes('partly')) {
      return 'partly cloudy'
    }
    return 'cloudy'
  }

  if (main === 'rain') {
    if (desc.includes('heavy')) return 'heavy rain'
    return 'rain'
  }

  if (main === 'thunderstorm') return 'thunderstorm'
  if (main === 'snow') return 'snow'
  if (main === 'fog' || main === 'mist') return 'fog'
  if (main === 'wind') return 'windy'

  return 'clear'
}