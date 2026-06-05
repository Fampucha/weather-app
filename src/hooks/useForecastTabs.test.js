import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useForecastTabs } from './useForecastTabs';

describe('useForecastTabs', () => {
  const mockDays = Array.from({ length: 10 }, (_, i) => ({ day: i }));

  it('returns default values', () => {
    const { result } = renderHook(() => useForecastTabs(mockDays));

    expect(result.current.daysCount).toBe(5);
    expect(result.current.activeDay).toBe(0);
    expect(result.current.visibleDays.length).toBe(5);
  });

  it('updates daysCount and visibleDays', () => {
    const { result } = renderHook(() => useForecastTabs(mockDays));

    act(() => {
      result.current.setDaysCount(7);
    });

    expect(result.current.visibleDays.length).toBe(7);
  });

  it('sets active day correctly', () => {
    const { result } = renderHook(() => useForecastTabs(mockDays));

    act(() => {
      result.current.setActiveDay(3);
    });

    expect(result.current.activeDay).toBe(3);
  });

  it('resets activeDay if it exceeds visibleDays', () => {
    const { result } = renderHook(() => useForecastTabs(mockDays));

    act(() => {
      result.current.setDaysCount(3);
      result.current.setActiveDay(5);
    });

    expect(result.current.activeDay).toBe(0);
  });

  it('handles invalid activeDay values', () => {
    const { result } = renderHook(() => useForecastTabs(mockDays));

    act(() => {
      result.current.setActiveDay(-10);
    });

    expect(result.current.activeDay).toBe(0);
  });
});