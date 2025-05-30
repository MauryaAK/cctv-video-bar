// export const parseTimeToSeconds = (timeStr: string): number => {
//   const [time, modifier] = timeStr.toLowerCase().split(/(am|pm)/);
//   const [hoursStr, minutesStr] = time.trim().split(":");
//   let hours = parseInt(hoursStr, 10);
//   const minutes = parseInt(minutesStr, 10);
//   if (modifier === "pm" && hours !== 12) hours += 12;
//   if (modifier === "am" && hours === 12) hours = 0;
//   return hours * 3600 + minutes * 60;
// };
// export const formatTime = (seconds: number): string => {
//   const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
//   const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
//   const secs = String(seconds % 60).padStart(2, "0");
//   return `${hrs}:${mins}:${secs}`;
// };
export const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
};
export const parseTimeToSeconds = (timeStr) => {
    const [time, meridian] = timeStr.toLowerCase().split(/(am|pm)/).filter(Boolean);
    let [hours, minutes] = time.split(":").map(Number);
    if (meridian === "pm" && hours !== 12)
        hours += 12;
    if (meridian === "am" && hours === 12)
        hours = 0;
    return hours * 3600 + minutes * 60;
};
export const getVisibleSecondsFromSegments = (segments) => {
    const visibleSet = new Set();
    segments.forEach(({ startTime, endTime }) => {
        const start = parseTimeToSeconds(startTime);
        const end = parseTimeToSeconds(endTime);
        const [from, to] = [Math.min(start, end), Math.max(start, end)];
        for (let i = from; i <= to; i++)
            visibleSet.add(i);
    });
    return visibleSet;
};
