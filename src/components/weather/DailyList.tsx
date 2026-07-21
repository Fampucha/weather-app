import type { Dispatch, SetStateAction } from "react";
import { resolveWeatherIcon } from "../../utils/resolveWeatherIcon";
import type { WeatherApiForecastDay } from "../../types";

type DailyListProps = {
  days: WeatherApiForecastDay[];
  activeDay: number;
  setActiveDay: (dayIndex: number) => void;
  isDay: boolean;
};

export default function DailyList({
  days,
  activeDay,
  setActiveDay,
  isDay
}: DailyListProps) {

  if (!days.length) return null;

  return (
    <div className="daily-list">
      {days.map((day, index) => {
        const date = new Date(day.date);

        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        });

        const noonSnapshot =
          day.hour.find((hourItem) => new Date(hourItem.time).getHours() === 12) ??
          day.hour[12];

        const isDayForCard = noonSnapshot
          ? noonSnapshot.is_day === 1
          : isDay;

        const { weatherType, icon } = resolveWeatherIcon({
          code: day.day.condition.code,
          text: day.day.condition.text,
          isDay: isDayForCard,
        });

        const isActive = activeDay === index;

        const min = Math.round(day.day.mintemp_c);
        const max = Math.round(day.day.maxtemp_c);

        return (
          <button
            className="day-item"
            key={day.date_epoch}
            onClick={() => setActiveDay(index)}
            data-active={isActive}
            type="button"
          >
            <div className="day-item__icon-wrap">
              <img className="day-item__icon"
                src={icon}
                alt={weatherType}
              />
            </div>                

            <div className="day-item__info">
              <p className="day-item__date">
                {formattedDate}
              </p>
              <p className="day-item__desc">
                {weatherType}
              </p>
            </div>

            <span className="day-item__divider" />

            <div className="day-item__temp">
              <p className="day-item__temp-min">{min}°</p>
              <p className="day-item__temp-max">{max}°</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
