import { useMemo, useRef } from "react";

export function useScrollableDrag({ axis = "x", wheelToHorizontal = false } = {}) {
  const containerRef = useRef(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0,
  });

  const handlers = useMemo(() => {
    const handleMouseDown = (event) => {
      if (event.button !== 0) return;

      const container = containerRef.current;
      if (!container) return;

      dragStateRef.current = {
        isDragging: true,
        startX: event.clientX,
        startY: event.clientY,
        startScrollLeft: container.scrollLeft,
        startScrollTop: container.scrollTop,
      };

      container.classList.add("is-dragging");
    };

    const handleMouseMove = (event) => {
      const container = containerRef.current;
      if (!container || !dragStateRef.current.isDragging) return;

      const deltaX = event.clientX - dragStateRef.current.startX;
      const deltaY = event.clientY - dragStateRef.current.startY;

      if (axis === "x") {
        container.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
      } else {
        container.scrollTop = dragStateRef.current.startScrollTop - deltaY;
      }
    };

    const stopDragging = () => {
      const container = containerRef.current;
      dragStateRef.current.isDragging = false;

      if (container) {
        container.classList.remove("is-dragging");
      }
    };

    const handleMouseLeave = () => {
      if (!dragStateRef.current.isDragging) return;
      stopDragging();
    };

    const handleWheel = (event) => {
      const container = containerRef.current;
      if (!container) return;

      if (wheelToHorizontal) {
        event.preventDefault();
        const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
        container.scrollLeft += delta;
        return;
      }

      if (axis === "y") {
        event.preventDefault();
        container.scrollTop += event.deltaY;
      }
    };

    return {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: stopDragging,
      onMouseLeave: handleMouseLeave,
      onWheel: handleWheel,
    };
  }, [axis, wheelToHorizontal]);

  return {
    containerRef,
    handlers,
  };
}

