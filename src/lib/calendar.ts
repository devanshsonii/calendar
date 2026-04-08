import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    addMonths,
    subMonths,
    isBefore,
    isSameMonth,
    isSameDay,
    getDay,
} from "date-fns";


export interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
    holiday?: string;
}


export function getCalendarDays(year: number, month: number): CalendarDay[] {
    const monthDate = new Date(year, month);
    const today = new Date();

    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    return days.map((date) => {
        const dayOfWeek = getDay(date);
        return {
            date,
            isCurrentMonth: isSameMonth(date, monthDate),
            isToday: isSameDay(date, today),
            isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
        };
    });
}
// added using claude 
export const MONTH_IMAGES: Record<number, { url: string; credit: string; gradientFrom: string; gradientTo: string }> = {
    0: { url: "https://picsum.photos/seed/january/800/600", credit: "Winter Mountains", gradientFrom: "#334155", gradientTo: "#1e3a5f" },
    1: { url: "https://picsum.photos/seed/february/800/600", credit: "Snowy Forest", gradientFrom: "#475569", gradientTo: "#155e75" },
    2: { url: "https://picsum.photos/seed/march/800/600", credit: "Spring Blossoms", gradientFrom: "#15803d", gradientTo: "#065f46" },
    3: { url: "https://picsum.photos/seed/april/800/600", credit: "Cherry Trees", gradientFrom: "#db2777", gradientTo: "#9f1239" },
    4: { url: "https://picsum.photos/seed/may/800/600", credit: "Green Fields", gradientFrom: "#16a34a", gradientTo: "#4d7c0f" },
    5: { url: "https://picsum.photos/seed/june/800/600", credit: "Summer Beach", gradientFrom: "#06b6d4", gradientTo: "#1d4ed8" },
    6: { url: "https://picsum.photos/seed/july/800/600", credit: "Sunflower Field", gradientFrom: "#f59e0b", gradientTo: "#a16207" },
    7: { url: "https://picsum.photos/seed/august/800/600", credit: "Mountain Lake", gradientFrom: "#0d9488", gradientTo: "#1e40af" },
    8: { url: "https://picsum.photos/seed/september/800/600", credit: "Autumn Leaves", gradientFrom: "#ea580c", gradientTo: "#991b1b" },
    9: { url: "https://picsum.photos/seed/october/800/600", credit: "Fall Colors", gradientFrom: "#b45309", gradientTo: "#9a3412" },
    10: { url: "https://picsum.photos/seed/november/800/600", credit: "Misty Forest", gradientFrom: "#4b5563", gradientTo: "#1e293b" },
    11: { url: "https://picsum.photos/seed/december/800/600", credit: "Winter Wonderland", gradientFrom: "#2563eb", gradientTo: "#312e81" },
};

export { format, addMonths, subMonths, isSameDay, isBefore };
