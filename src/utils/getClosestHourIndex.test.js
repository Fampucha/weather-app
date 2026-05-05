import { describe, it, expect } from 'vitest';
import { getClosestHourIndex } from './getClosestHourIndex';

describe('getClosestHourIndex', () => {
  it('returns correct index when exact match exists', () => {
    const hours = [
      { time_epoch: 100 },
      { time_epoch: 200 },
      { time_epoch: 300 },
    ];

    const result = getClosestHourIndex(hours, 200);

    expect(result).toBe(1);
  });

  it('returns closest smaller hour index', () => {
    const hours = [
      { time_epoch: 100 },
      { time_epoch: 200 },
      { time_epoch: 300 },
    ];

    const result = getClosestHourIndex(hours, 250);

    expect(result).toBe(1);
  });

  it('returns last index if all hours are greater', () => {
    const hours = [
      { time_epoch: 100 },
      { time_epoch: 200 },
      { time_epoch: 300 },
    ];

    const result = getClosestHourIndex(hours, 50);

    expect(result).toBe(2);
  });

  it('returns 0 if hours array is empty', () => {
    const result = getClosestHourIndex([], 200);

    expect(result).toBe(0);
  });

  it('returns 0 if referenceEpoch is not provided', () => {
    const hours = [{ time_epoch: 100 }];

    const result = getClosestHourIndex(hours);

    expect(result).toBe(0);
  });
});