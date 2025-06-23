import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef, useEffect } from 'react';
const MiniMapCanvas = ({ selectedTime, segments, minTime, maxTime, scrollbarHeight, scrollbarStyle, scrollbarSegmentStyle, viewportIndicatorStyle, onMiniMapClick, }) => {
    const miniMapRef = useRef(null);
    const timeSpan = maxTime - minTime;
    useEffect(() => {
        if (!miniMapRef.current)
            return;
        const miniCanvas = miniMapRef.current;
        const miniCtx = miniCanvas.getContext('2d');
        const containerWidth = miniCanvas.clientWidth || 100;
        miniCanvas.width = containerWidth * window.devicePixelRatio;
        miniCanvas.height = scrollbarHeight * window.devicePixelRatio;
        miniCanvas.style.width = `${containerWidth}px`;
        miniCanvas.style.height = `${scrollbarHeight}px`;
        miniCtx.scale(window.devicePixelRatio, window.devicePixelRatio);
        miniCtx.clearRect(0, 0, containerWidth, scrollbarHeight);
        segments.forEach((row) => {
            row.forEach((seg) => {
                const startX = ((seg.start - minTime) / timeSpan) * containerWidth;
                const endX = ((seg.end - minTime) / timeSpan) * containerWidth;
                miniCtx.fillStyle = (scrollbarSegmentStyle && scrollbarSegmentStyle.backgroundColor) || 'blue';
                miniCtx.fillRect(startX, 10, endX - startX, 5);
            });
        });
        if (selectedTime !== null) {
            const selectedX = ((selectedTime - minTime) / timeSpan) * containerWidth;
            miniCtx.fillStyle = (viewportIndicatorStyle === null || viewportIndicatorStyle === void 0 ? void 0 : viewportIndicatorStyle.backgroundColor) || 'gray';
            miniCtx.beginPath();
            miniCtx.ellipse(selectedX, 12, 10, 5, 0, 0, Math.PI * 2);
            miniCtx.fill();
        }
    }, [selectedTime, segments, minTime, maxTime, scrollbarHeight, scrollbarSegmentStyle, viewportIndicatorStyle]);
    return (_jsx("canvas", { ref: miniMapRef, onClick: (e) => onMiniMapClick(e, miniMapRef), style: Object.assign({ width: '100%', cursor: 'pointer', height: scrollbarHeight }, scrollbarStyle) }));
};
export default React.memo(MiniMapCanvas);
