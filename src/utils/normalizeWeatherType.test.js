import { describe, it, expect } from 'vitest';
import { normalizeWeatherType } from './normalizeWeatherType';

describe('normalizeWeatherType', () => {
  it('returns correct type based on known weather code', () => {
    expect(normalizeWeatherType(1000)).toBe('Clear');
    expect(normalizeWeatherType(1003)).toBe('Partly Cloudy');
    expect(normalizeWeatherType(1006)).toBe('Clouds');
  });

  it('prioritizes heavy rain over rain', () => {
    expect(normalizeWeatherType(1195)).toBe('Heavy Rain');
  });

  it('returns correct type for snow codes', () => {
    expect(normalizeWeatherType(1210)).toBe('Snow');
  });

  it('falls back to text if code is unknown', () => {
    expect(normalizeWeatherType(null, 'light rain')).toBe('Rain');
    expect(normalizeWeatherType(undefined, 'foggy morning')).toBe('Fog');
  });

  it('returns clouds as default fallback', () => {
    expect(normalizeWeatherType(null, 'some weird weather')).toBe('clouds');
  });
});