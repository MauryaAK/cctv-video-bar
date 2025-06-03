import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect, memo } from "react";
import { formatTime, parseTimeToSeconds } from "../utils/timeUtils";
export const ScrollbarCanvas = memo(({ width, height, videoSegments, totalSeconds, segmentStyle, }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(0, 0, width, height);
        const pixelPerSecond = width / totalSeconds;
        const minSegmentWidthForText = 40;
        const fontSize = Math.min(height * 0.7, 8);
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = segmentStyle.backgroundColor || "#1e40af";
        ctx.textBaseline = "middle";
        videoSegments.forEach(({ start_time, end_time }) => {
            const startSec = parseTimeToSeconds(start_time);
            const endSec = parseTimeToSeconds(end_time);
            const from = Math.min(startSec, endSec);
            const to = Math.max(startSec, endSec);
            const segmentWidth = (to - from + 1) * pixelPerSecond;
            ctx.fillStyle = segmentStyle.backgroundColor || "green";
            ctx.fillRect(from * pixelPerSecond, 0, segmentWidth, height);
            const startText = formatTime(from);
            const endText = formatTime(to);
            const startTextWidth = ctx.measureText(startText).width;
            const endTextWidth = ctx.measureText(endText).width;
            const totalTextWidth = startTextWidth + endTextWidth + 4;
            if (segmentWidth >= Math.max(minSegmentWidthForText, totalTextWidth)) {
                ctx.fillStyle = "#ffffff";
                const textY = height / 2;
                ctx.fillText(startText, from * pixelPerSecond + 2, textY);
                ctx.textAlign = "end";
                ctx.fillText(endText, (to + 1) * pixelPerSecond - 2, textY);
                ctx.textAlign = "start";
            }
        });
    }, [width, height, videoSegments, totalSeconds, segmentStyle]);
    return _jsx("canvas", { ref: canvasRef, className: "w-full", style: { height } });
});
