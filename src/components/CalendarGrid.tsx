"use client";

import { useCallback } from "react";
import {
  getCalendarDays,
  isSameDay,
  format,
  type CalendarDay,
} from "@/lib/calendar";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarGridProps {
  year: number;
  month: number;
}

export default function CalendarGrid({
  year,
  month,
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
    []
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
