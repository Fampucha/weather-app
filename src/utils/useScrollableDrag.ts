import { useMemo, useRef, type MouseEventHandler, type WheelEventHandler } from "react";

type ScrollAxis = "x" | "y";

type UseScrollableDragOptions = {
  axis?: ScrollAxis;
  wheelToHorizontal?: boolean;
};

type DragState = {
  isDragging: boolean;
  startX: number;
  startY: number;
  startScrollLeft: number;
  startScrollTop: number;
};

type ScrollableDragHandlers = {
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onMouseMove: MouseEventHandler<HTMLDivElement>;
  onMouseUp: MouseEventHandler<HTMLDivElement>;
  onMouseLeave: MouseEventHandler<HTMLDivElement>;
  onWheel: WheelEventHandler<HTMLDivElement>;
};

export function useScrollableDrag({ axis = "x", wheelToHorizontal = false }: UseScrollableDragOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0,
  });

  const handlers = useMemo<ScrollableDragHandlers>(() => {
    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
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

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
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

    const stopDragging = (): void => {
      const container = containerRef.current;
      dragStateRef.current.isDragging = false;

      if (container) {
        container.classList.remove("is-dragging");
      }
    };

    const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
      if (!dragStateRef.current.isDragging) return;
      stopDragging();
    };

    const handleWheel: WheelEventHandler<HTMLDivElement> = (event) => {
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

