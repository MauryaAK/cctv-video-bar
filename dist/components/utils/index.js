export const convertSegments = (data) => {
    const toSeconds = (time) => {
        if (time instanceof Date) {
            return Math.floor(time.getTime() / 1000);
        }
        const ampmMatch = time.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(am|pm)?$/i);
        if (ampmMatch) {
            let h = +ampmMatch[1];
            const m = +ampmMatch[2];
            const s = ampmMatch[3] ? +ampmMatch[3] : 0;
            if (ampmMatch[4]) {
                const isPM = ampmMatch[4].toLowerCase() === "pm";
                if (isPM && h < 12)
                    h += 12;
                if (!isPM && h === 12)
                    h = 0;
            }
            return h * 3600 + m * 60 + s;
        }
        return Math.floor(new Date(time).getTime() / 1000);
    };
    return data.map((innerArray) => innerArray.map((seg) => {
        var _a, _b;
        const rawStart = (_a = seg.startTime) !== null && _a !== void 0 ? _a : seg.start_time;
        const rawEnd = (_b = seg.endTime) !== null && _b !== void 0 ? _b : seg.end_time;
        return {
            start: toSeconds(rawStart),
            end: toSeconds(rawEnd),
        };
    }));
};
