import { describe, it, expect } from 'vitest';
import { resolveWeatherTheme } from './resolveWeatherTheme';
import { weatherThemes } from '../constants/weatherThemes';

describe('resolveWeatherTheme', () => {
  it('returns correct theme for clear weather', () => {
    const result = resolveWeatherTheme({ code: 1000 });

    expect(result.themeKey).toBe('clear');
    expect(result.theme).toBe(weatherThemes.clear);
    expect(result.label).toBe(weatherThemes.clear.label);
  });

  it('maps partly cloudy correctly', () => {
    const result = resolveWeatherTheme({ code: 1003 });

    expect(result.themeKey).toBe('partlyCloudy');
  });

  it('handles rain correctly', () => {
    const result = resolveWeatherTheme({ code: 1183 });

    expect(result.themeKey).toBe('rain');
  });

  it('falls back to text when code is unknown', () => {
    const result = resolveWeatherTheme({ code: null, text: 'Sunny sky' });

    expect(result.themeKey).toBe('clear');
  });

    it('falls back to cloudy when type is unknown', () => {
    const result = resolveWeatherTheme({ code: null, text: 'unknown weather type' });

    expect(result.themeKey).toBe('cloudy');
    expect(result.theme).toBe(weatherThemes.cloudy);
    });

  it('returns normalized weatherType in lowercase', () => {
    const result = resolveWeatherTheme({ code: 1000 });

    expect(result.weatherType).toBe('clear');
  });
});