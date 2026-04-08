"use client";

import { useState, useEffect, useCallback } from "react";
interface NotesPanelProps {
    year: number;
    month: number;
}

interface Note {
    id: string;
    text: string;
    createdAt: string;
}

function getStorageKey(year: number, month: number): string {
    return `calendar-notes-${year}-${month}`;
}
export default function NotesPanel({
    year,
    month,
}: NotesPanelProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem(getStorageKey(year, month));
        if (stored) {
            try { setNotes(JSON.parse(stored)); } catch { setNotes([]); }
        } else {
            setNotes([]);
        }
    }, [year, month]);

    const saveNotes = useCallback(
        (updatedNotes: Note[]) => {
            setNotes(updatedNotes);
            localStorage.setItem(getStorageKey(year, month), JSON.stringify(updatedNotes));
        },
        [year, month]
    );

    const addNote = () => {
        if (!inputValue.trim()) return;
        const newNote: Note = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            createdAt: new Date().toISOString(),
        };
        saveNotes([...notes, newNote]);
        setInputValue("");
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <h3 style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--c-fg)",
                    margin: 0,
                }}>
                    Notes
                </h3>
                <div style={{ display: "flex", gap: 4 }}>
                </div>
            </div>

            <div className="notes-lines" style={{
                flex: 1,
                overflowY: "auto",
                marginBottom: 12,
                minHeight: 120,
            }}>
            </div>

            <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                    placeholder="Add note..."
                    style={{
                        flex: 1,
                        padding: "6px 8px",
                        fontSize: 11,
                        background: "var(--c-hover)",
                        border: "1px solid var(--c-border)",
                        borderRadius: 4,
                        color: "var(--c-fg)",
                        outline: "none",
                        minWidth: 0,
                    }}
                />
                <button
                    onClick={addNote}
                    disabled={!inputValue.trim()}
                    style={{
                        padding: "6px 10px",
                        background: inputValue.trim() ? "var(--c-accent)" : "var(--c-muted)",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: 4,
                        border: "none",
                        cursor: inputValue.trim() ? "pointer" : "not-allowed",
                        opacity: inputValue.trim() ? 1 : 0.4,
                        flexShrink: 0,
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );
}