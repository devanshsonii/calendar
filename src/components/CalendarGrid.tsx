"use client";

import { useCallback } from "react";
import {
  getCalendarDays,
  isSameDay,
  format,
  isBefore,
  isAfter,
  type CalendarDay,
} from "@/lib/calendar";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarGridProps {
  year: number;
  month: number;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onDateClick?: (date: Date) => void;
  onDateHover?: (date: Date | null) => void;
  hoverDate?: Date | null;
}

export default function CalendarGrid({
  year,
  month,
  rangeStart,
  rangeEnd,
  onDateClick,
  onDateHover,
  hoverDate,
}: CalendarGridProps) {
  const days = getCalendarDays(year, month);

  const getDayStyle = useCallback(
    (day: CalendarDay): React.CSSProperties => {
      const base: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 36,
        width: "100%",
        fontSize: 13,
        fontWeight: 500,
        borderRadius: 4,
        cursor: day.isCurrentMonth ? "pointer" : "default",
        userSelect: "none",
        position: "relative",
        transition: "all 0.12s ease",
      };

      if (!day.isCurrentMonth) {
        return { ...base, color: "var(--c-muted)", opacity: 0.25 };
      }

      const isRangeStart = rangeStart && isSameDay(day.date, rangeStart);
      const isRangeEnd = rangeEnd && isSameDay(day.date, rangeEnd);
      const isInRange = rangeStart && rangeEnd && 
        !isBefore(day.date, rangeStart) && 
        !isAfter(day.date, rangeEnd);
      
      if (isRangeStart || isRangeEnd) {
        return {
          ...base,
          background: "var(--c-accent)",
          color: "#fff",
          fontWeight: 700,
          borderRadius: 6,
        };
      }

      if (isInRange) {
        return {
          ...base,
          background: "var(--c-range)",
          color: "var(--c-fg)",
          fontWeight: 600,
          borderRadius: 0,
        };
      }

      if (day.isToday) {
        return {
          ...base,
          outline: "2px solid var(--c-accent)",
          outlineOffset: -2,
          fontWeight: 700,
          color: "var(--c-accent)",
          borderRadius: 6,
        };
      }
      if (day.isWeekend) {
        return { ...base, color: "var(--c-weekend)", fontWeight: 600 };
      }
      return { ...base, color: "var(--c-fg)" };
    },
    [rangeStart, rangeEnd]
  );

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            style={{
              textAlign: "center",
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              paddingBottom: 8,
              color: i >= 5 ? "var(--c-weekend)" : "var(--c-muted-dark)",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--c-border)", marginBottom: 8 }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px 0" }}>
        {days.map((day, index) => (
          <div key={index} style={{ position: "relative" }}>
            <div
              style={getDayStyle(day)}
              title={day.holiday || undefined}
              onClick={() => day.isCurrentMonth && onDateClick?.(day.date)}
              onMouseEnter={() => day.isCurrentMonth && onDateHover?.(day.date)}
              onMouseLeave={() => day.isCurrentMonth && onDateHover?.(null)}
            >
              {format(day.date, "d")}
              {day.holiday && day.isCurrentMonth && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--c-accent)",
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
