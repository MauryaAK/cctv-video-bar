export const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
};
export const parseTimeToSeconds = (timeInput) => {
    let date;
    if (timeInput instanceof Date) {
        date = timeInput;
    }
    else {
        const trimmed = timeInput.trim().toLowerCase();
        if (/^\d{1,2}:\d{2}(:\d{2})?(am|pm)$/.test(trimmed)) {
            const [time, meridian] = trimmed.split(/(am|pm)/).filter(Boolean);
            const parts = time.split(":");
            const h = Number(parts[0]);
            const m = Number(parts[1] || "0");
            const s = Number(parts[2] || "0");
            let hours = h;
            if (meridian === "pm" && hours !== 12)
                hours += 12;
            if (meridian === "am" && hours === 12)
                hours = 0;
            return hours * 3600 + m * 60 + s;
        }
        if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(trimmed)) {
            const parts = trimmed.split(":");
            const h = Number(parts[0]);
            const m = Number(parts[1] || "0");
            const s = Number(parts[2] || "0");
            return h * 3600 + m * 60 + s;
        }
        const parsed = new Date(trimmed.replace(" ", "T"));
        if (!isNaN(parsed.getTime())) {
            date = parsed;
        }
        else {
            throw new Error(`Unsupported time format: ${timeInput}`);
        }
    }
    return (date.getHours() * 3600 +
        date.getMinutes() * 60 +
        date.getSeconds());
};
export const getVisibleSecondsFromSegments = (segments) => {
    const visibleSet = new Set();
    segments.forEach(({ start_time, end_time }) => {
        const startSec = parseTimeToSeconds(start_time);
        const endSec = parseTimeToSeconds(end_time);
        const from = Math.min(startSec, endSec);
        const to = Math.max(startSec, endSec);
        for (let sec = from; sec <= to; sec++) {
            visibleSet.add(sec);
        }
    });
    return visibleSet;
};
