"use client"
import { useState, useEffect, useCallback } from 'react';
import {
    format,
    addMonths,
    subMonths,
    MONTH_IMAGES,
} from "@/lib/calendar";
import NotesPanel from './Notes';
import CalendarGrid from './CalendarGrid';

export default function WallCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [flipKey, setFlipKey] = useState(0);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthImage = MONTH_IMAGES[month];

    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

    useEffect(() => {
        setImgLoaded(false);
        setImgError(false);
    }, [month, year]);

    useEffect(() => {
        const saved = localStorage.getItem("calendar-theme");
        if (saved === "dark" || saved === "light") setTheme(saved);
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
            setTheme("dark");
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("calendar-theme", theme);
    }, [theme]);

    const navigateMonth = useCallback((direction: "prev" | "next") => {
        setCurrentDate((prev) =>
            direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)
        );
        setFlipKey((k) => k + 1);
    }, []);

    const goToToday = useCallback(() => {
        setCurrentDate(new Date());
        setFlipKey((k) => k + 1);
    }, []);

    return (
        <div className="w-full max-w-lg mx-auto px-4 py-8 sm:py-12">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1"
                    onKeyDown={(e) => {
                        if (e.key == "ArrowRight") {
                            navigateMonth("next")
                        }
                        if (e.key == "ArrowLeft") {
                            navigateMonth("prev")
                        }
                    }}
                >
                    <button
                        onClick={() => navigateMonth("prev")}
                        className="p-2 rounded-lg"
                        style={{ color: "var(--c-fg)" }}
                        aria-label="Previous month"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <button
                        onClick={goToToday}
                        disabled={isCurrentMonth}
                        className="px-3 py-1 text-xs font-semibold text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: "var(--c-accent)" }}
                    >
                        Go to Today
                    </button>
                    <button
                        onClick={() => navigateMonth("next")}
                        className="p-2 rounded-lg"
                        style={{ color: "var(--c-fg)" }}
                        aria-label="Next month"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                </div>

                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full shadow-sm"
                    style={{ background: "var(--c-card)", color: "var(--c-fg)" }}
                    aria-label="Toggle theme"
                >
                    {theme === "light" ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                    ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                    )}
                </button>
            </div>

            <div className="wall-calendar rounded-lg overflow-hidden">
                <div className="spiral-container">
                    <div className="spiral-wire">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div key={i} className="spiral-ring" />
                        ))}
                    </div>
                </div>

                <div className="relative calendar-flip" key={`img-${flipKey}`}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(135deg, ${monthImage.gradientFrom}, ${monthImage.gradientTo})`,
                            }}
                        />

                        {!imgError && (
                            <img
                                src={monthImage.url}
                                alt={monthImage.credit}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    opacity: imgLoaded ? 1 : 0,
                                    transition: "opacity 0.5s ease",
                                }}
                                loading="eager"
                                onLoad={() => setImgLoaded(true)}
                                onError={() => setImgError(true)}
                                crossOrigin="anonymous"
                            />
                        )}

                        {(imgError || !imgLoaded) && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-6xl sm:text-7xl font-black uppercase tracking-widest select-none"
                                    style={{ color: "rgba(255,255,255,0.15)" }}>
                                    {format(currentDate, "MMM")}
                                </span>
                            </div>
                        )}

                        <div className="hero-overlay" />

                        <div className="absolute bottom-4 right-6 z-10 text-right">
                            <div className="text-lg font-light tracking-widest leading-tight"
                                style={{ color: "rgba(255,255,255,0.9)" }}>
                                {year}
                            </div>
                            <div className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider leading-tight text-white">
                                {format(currentDate, "MMMM")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='calendar-container'>
                        
                    <div className="calendar-flip" key={`grid-${flipKey}`}>
                        <div className="flex flex-col sm:flex-row" style={{ minHeight: 280 }}>
                            <div className="sm:w-2/5 flex flex-col"
                                style={{ borderRight: "1px solid var(--c-border)" }}>
                                <NotesPanel
                                    year={year}
                                    month={month}
                                />
                            </div>
                            <div className="sm:w-3/5 px-4 sm:px-5 py-4 ">
                                <CalendarGrid
                                    year={year}
                                    month={month}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
