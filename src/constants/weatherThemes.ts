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

export type ThemeMode = "day" | "night";

export interface WeatherThemeVariant {
  background: string;
  mode: ThemeMode;
}

export interface WeatherTheme {
  label: string;
  day: WeatherThemeVariant;
  night: WeatherThemeVariant;
}


export const weatherThemes = {
  clear: {
    label: "Clear",
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
    label: "Partly Cloudy",
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
    label: "Cloudy",
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
    label: "Rain",
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
    label: "Heavy Rain",
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
    label: "Thunderstorm",
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
    label: "Snow",
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
    label: "Fog",
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
    label: "Windy",
    day: {
      background: windyDay,
      mode: 'day'
    },
    night: {
      background: windyNight,
      mode: 'night'
    }
  }
}as const satisfies Record<string, WeatherTheme>;

export type WeatherThemeKey = keyof typeof weatherThemes;