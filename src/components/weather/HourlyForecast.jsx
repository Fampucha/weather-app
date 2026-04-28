import React, { useEffect, useRef } from "react";
import { resolveWeatherIcon } from "../../utils/resolveWeatherIcon";
import { useScrollableDrag } from "../../utils/useScrollableDrag";
import clearDay from "../../assets/icons/weather/clear-day.svg";
import clearNight from "../../assets/icons/weather/clear-night.svg";

function HourlyForecast({
  hours,
  activeHourIndex,
  setActiveHourIndex,
}) {
  const { containerRef, handlers } = useScrollableDrag({
    axis: "x",
    wheelToHorizontal: true,
  });
  const cardRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const activeCard = cardRefs.current[activeHourIndex];

    if (!container || !activeCard) return;

    activeCard.scrollIntoView({
      behavior: "auto",
      inline: "center",
      block: "nearest",
    });
  }, [activeHourIndex, hours, containerRef]);

  if (!hours?.length) return null;

  return (
    <div
      className="hourly-forecast"
      ref={containerRef}
      {...handlers}
    >
      {hours.map((item, index) => {
        const hour = new Date(item.time).toLocaleTimeString([], { hour: "2-digit" });
        const conditionCode = Number(item.condition.code);
        const conditionText = String(item.condition.text ?? "");

        const { weatherType, icon: resolvedIcon } = resolveWeatherIcon({
          code: conditionCode,
          text: conditionText,
          isDay: String(item.is_day) === "1",
        });

        const isHourDay = String(item.is_day) === "1";
        const isClearCondition =
          conditionCode === 1000 || /^(clear|sunny)$/i.test(conditionText);

        // console.log("HOURLY DEBUG:", {
        //   time: item.time,
        //   hour,
        //   code: conditionCode,
        //   text: conditionText,
        //   isDay: isHourDay,
        //   weatherType,
        //   isClearCondition,
        //   resolvedIcon,
        // });

        const icon = isClearCondition
          ? (isHourDay ? clearDay : clearNight)
          : resolvedIcon;

        const isActive = index === activeHourIndex;

        return (
          <div
            className={`hour-item__card card ${isActive ? "hour-item__card--active card--active" : ""}`}
            key={item.time_epoch}
            onClick={() => setActiveHourIndex(index)}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
          >
            <p className="hour-item__time">{hour}:00</p>

            <span className="hour-item__divider"></span>

            <div className="hour-item__icon-wrap">
              <img className="hour-item__icon" src={icon} alt={weatherType} />
            </div>

            <p className="hour-item__temp">{Math.round(item.temp_c)}°C</p>
          </div>
        );
      })}
    </div>
  );
}

export default HourlyForecast;
