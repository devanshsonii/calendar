"use client"
import { useState, useEffect, useCallback } from 'react';
import {
	addMonths,
	subMonths
} from "@/lib/calendar";

export default function WallCalendar() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [imgLoaded, setImgLoaded] = useState(false);
	const [imgError, setImgError] = useState(false);

	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();

	useEffect(() => {
		setImgLoaded(false);
		setImgError(false);
	}, [month, year]);

	




}
