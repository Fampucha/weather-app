import clearDay from '../assets/images/weather/clear/day.jpg'
import clearNight from '../assets/images/weather/clear/night.jpg'

import partlyCloudyDay from '../assets/images/weather/partly-cloudy/day.jpg'
import partlyCloudyNight from '../assets/images/weather/partly-cloudy/night.jpg'

import cloudyDay from '../assets/images/weather/cloudy/day.jpg'
import cloudyNight from '../assets/images/weather/cloudy/night.jpg'

import rainDay from '../assets/images/weather/rain/day.jpg'
import rainNight from '../assets/images/weather/rain/night.jpg'

import heavyRainDay from '../assets/images/weather/heavy-rain/day.jpg'
import heavyRainNight from '../assets/images/weather/heavy-rain/night.jpg'

import thunderstormDay from '../assets/images/weather/thunderstorm/day.jpg'
import thunderstormNight from '../assets/images/weather/thunderstorm/night.jpg'

import snowDay from '../assets/images/weather/snow/day.jpg'
import snowNight from '../assets/images/weather/snow/night.jpg'

import fogDay from '../assets/images/weather/fog/day.jpg'
import fogNight from '../assets/images/weather/fog/night.jpg'

import windyDay from '../assets/images/weather/windy/day.jpg'
import windyNight from '../assets/images/weather/windy/night.jpg'


export const weatherThemes = {
  clear: {
    day: {
      background: clearDay,
      mode: 'day'
    },
    night: {
      background: clearNight,
      mode: 'night'
    }
  },

  partlyCloudy: {
    day: {
      background: partlyCloudyDay,
      mode: 'day'
    },
    night: {
      background: partlyCloudyNight,
      mode: 'night'
    }
  },

  cloudy: {
    day: {
      background: cloudyDay,
      mode: 'day'
    },
    night: {
      background: cloudyNight,
      mode: 'night'
    }
  },

  rain: {
    day: {
      background: rainDay,
      mode: 'day'
    },
    night: {
      background: rainNight,
      mode: 'night'
    }
  },

  heavyRain: {
    day: {
      background: heavyRainDay,
      mode: 'day'
    },
    night: {
      background: heavyRainNight,
      mode: 'night'
    }
  },

  thunderstorm: {
    day: {
      background: thunderstormDay,
      mode: 'day'
    },
    night: {
      background: thunderstormNight,
      mode: 'night'
    }
  },

  snow: {
    day: {
      background: snowDay,
      mode: 'day'
    },
    night: {
      background: snowNight,
      mode: 'night'
    }
  },
  
  fog: {
    day: {
      background: fogDay,
      mode: 'day'
    },
    night: {
      background: fogNight,
      mode: 'night'
    }
  },

  windy: {
    day: {
      background: windyDay,
      mode: 'day'
    },
    night: {
      background: windyNight,
      mode: 'night'
    }
  }
}