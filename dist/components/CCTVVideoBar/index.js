import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useEffect, useState, useMemo } from 'react';
import TimeDisplay from './TimeDisplay';
import MidLine from './MidLine';
import TimelineCanvas from './TimelineCanvas';
import MiniMapCanvas from './MiniMapCanvas';
import { convertSegments } from '../utils';
const rowGap = 2;
const ProgressBar = ({ value = 0, onTimeChange, segments, segmentHeight, containerStyle, midLineStyle, timeTextStyle, timeTextContainerStyle, barStyle, emptyBarColor = '#000', scrollContainerStyle, maxWidth, scrollbarHeight = 17, scrollbarStyle, scrollbarSegmentStyle, viewportIndicatorStyle, timeVisibility = true, tickIntervalFont = 10, tickIntervalTextColor = '#fff', }) => {
    const containerRef = useRef(null);
    const isAutoScrolling = useRef(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const convertedSegments = useMemo(() => convertSegments(segments), [segments]);
    const rowCount = useMemo(() => convertedSegments.length, [convertedSegments]);
    const rowHeight = segmentHeight || 25;
    const canvasHeight = rowCount * (rowHeight + rowGap);
    const { minTime, maxTime } = React.useMemo(() => {
        let min = Infinity;
        let max = -Infinity;
        convertedSegments.flat().forEach(({ start, end }) => {
            if (start < min)
                min = start;
            if (end > max)
                max = end;
        });
        return { minTime: min, maxTime: max };
    }, [convertedSegments]);
    const timeSpan = maxTime - minTime;
    const pixelsPerSecond = timeSpan < 300 ? 10 : timeSpan < 3600 ? 10 : 0.1;
    const totalPixelWidth = timeSpan * pixelsPerSecond;
    const handleScroll = () => {
        if (isAutoScrolling.current)
            return;
        const container = containerRef.current;
        const centerX = container.scrollLeft;
        const currentTime = minTime + (centerX / totalPixelWidth) * timeSpan;
        setSelectedTime(Math.floor(currentTime));
        onTimeChange(Math.floor(currentTime));
    };
    useEffect(() => {
        if (containerRef.current) {
            isAutoScrolling.current = true;
            containerRef.current.scrollLeft = (value - minTime) * pixelsPerSecond;
            setTimeout(() => {
                isAutoScrolling.current = false;
            }, 100);
        }
    }, [value, minTime, pixelsPerSecond]);
    useEffect(() => {
        handleScroll();
    }, []);
    const handleMiniMapClick = (e, miniMapRef) => {
        const rect = miniMapRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const miniWidth = miniMapRef.current.clientWidth;
        const clickedTime = minTime + (clickX / miniWidth) * timeSpan;
        setSelectedTime(clickedTime);
        onTimeChange(Math.floor(clickedTime));
        if (containerRef.current) {
            const scrollLeft = (clickedTime - minTime) * pixelsPerSecond - containerRef.current.clientWidth / 2;
            containerRef.current.scrollLeft = scrollLeft;
        }
    };
    return (_jsxs("div", { style: Object.assign({ position: 'relative', height: 'auto', border: '1px solid blue', marginBottom: 0, paddingTop: 1, borderRadius: '3px', overflow: 'hidden', maxWidth }, containerStyle), children: [timeVisibility && (_jsxs(_Fragment, { children: [_jsx(TimeDisplay, { value: value, timeTextStyle: timeTextStyle, timeTextContainerStyle: timeTextContainerStyle }), _jsx(MidLine, { midLineStyle: midLineStyle })] })), _jsx("div", { className: "timeline-container", ref: containerRef, onScroll: handleScroll, style: Object.assign({ overflowX: 'auto', overflowY: 'hidden', paddingLeft: '50%', paddingRight: '50%', height: 'auto', width: '100%' }, scrollContainerStyle), children: _jsx(TimelineCanvas, { segments: convertedSegments, minTime: minTime, maxTime: maxTime, timeSpan: timeSpan, totalPixelWidth: totalPixelWidth, canvasHeight: canvasHeight, barStyle: barStyle, emptyBarColor: emptyBarColor, rowHeight: rowHeight, tickIntervalFont: tickIntervalFont, tickIntervalTextColor: tickIntervalTextColor }) }), _jsx("div", { style: { textAlign: 'center', marginTop: '-10px' }, children: _jsx(MiniMapCanvas, { selectedTime: selectedTime, segments: convertedSegments, minTime: minTime, maxTime: maxTime, scrollbarHeight: scrollbarHeight, scrollbarStyle: scrollbarStyle, scrollbarSegmentStyle: scrollbarSegmentStyle, viewportIndicatorStyle: viewportIndicatorStyle, onMiniMapClick: handleMiniMapClick }) })] }));
};
const ProgressScale = React.memo(ProgressBar);
export { ProgressScale };
