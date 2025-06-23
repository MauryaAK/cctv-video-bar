import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef, useEffect } from 'react';
const rowGap = 2;
const TimelineCanvas = ({ segments, minTime, maxTime, timeSpan, totalPixelWidth, canvasHeight, barStyle, emptyBarColor, rowHeight, tickIntervalFont, tickIntervalTextColor, }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = totalPixelWidth * dpr;
        canvas.height = canvasHeight * dpr;
        canvas.style.width = `${totalPixelWidth}px`;
        canvas.style.height = `${canvasHeight}px`;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, totalPixelWidth, canvasHeight);
        segments.forEach((row, rowIndex) => {
            const y = rowIndex * (rowHeight + rowGap);
            row.forEach((segment) => {
                const startX = ((segment.start - minTime) / timeSpan) * totalPixelWidth;
                const endX = ((segment.end - minTime) / timeSpan) * totalPixelWidth;
                ctx.fillStyle = (barStyle && barStyle.backgroundColor) || 'blue';
                ctx.fillRect(startX, y, endX - startX, rowHeight);
            });
        });
        const tickInterval = 3600;
        ctx.strokeStyle = '#999';
        ctx.fillStyle = tickIntervalTextColor;
        ctx.font = `${tickIntervalFont}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (let t = Math.ceil(minTime / tickInterval) * tickInterval; t <= maxTime; t += tickInterval) {
            const x = ((t - minTime) / timeSpan) * totalPixelWidth;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight);
            ctx.stroke();
            const date = new Date(t * 1000);
            const timeString = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'UTC',
            });
            ctx.fillText(timeString, x, 2);
        }
    }, [segments, minTime, maxTime, timeSpan, totalPixelWidth, canvasHeight, barStyle, rowHeight, tickIntervalFont, tickIntervalTextColor]);
    return (_jsx("canvas", { ref: canvasRef, style: Object.assign({ display: 'block', backgroundColor: emptyBarColor }, barStyle) }));
};
export default React.memo(TimelineCanvas);
