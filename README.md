# Wall Calendar

A beautiful, interactive wall calendar built with React and Next.js. Features date range selection, notes management, dark/light theme toggle, and responsive design.

## Features

**Interactive Notes**
- Add, view, and delete notes directly in the calendar
- All notes are saved to browser localStorage
- Notes are scoped by date range

**Theme Toggle**
- Seamless switching between dark and light themes
- Automatically detects system preference on first load
- Persists your choice in localStorage across sessions

**Date Range Selection**
- Click any date to start a selection, click again to end it
- Dates between start and end are visually highlighted
- Automatically swaps order if you select backwards
- Clear button to quickly reset your selection

**Responsive Design**
- Desktop layout: Notes on the left (40%), calendar on the right (60%)
- Mobile layout: Stacked vertically to fit smaller screens

**Visual Polish**
- Hero image for each month with fallback gradients
- Smooth flip animation when navigating between months
- Spiral binding decoration matches physical wall calendar aesthetic

**Month Navigation**
- Previous/Next buttons to browse months
- "Go to Today" button (disabled when viewing current month)
- Keyboard arrow key support (← and → to navigate)

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## How to Run

### With pnpm
```bash
pnpm i
pnpm dev
```

### With npm
```bash
npm install
npm run dev
```
