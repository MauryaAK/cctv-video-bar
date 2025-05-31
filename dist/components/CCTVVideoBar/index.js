import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect, useMemo, useCallback, } from "react";
import { getVisibleSecondsFromSegments, formatTime } from "./utils/timeUtils";
import { Segment } from "./Segment";
export const CCTVVideoBar = ({ totalSeconds = 86400, segmentWidth = 1, segmentHeight = 80, videoSegments = [], onTimeChange, containerStyle = {}, midLineStyle = {}, timeContainerStyle = {}, timeTextStyle = {}, barStyle = {}, emptyBarColor = "#fff", scrollContainerStyle = {}, maxWidth = "100%", }) => {
    var _a;
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const hideTimeoutRef = useRef(null);
    const scrollAnimationFrame = useRef(null);
    const [padding, setPadding] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const visibleTimeSet = useMemo(() => getVisibleSecondsFromSegments(videoSegments), [videoSegments]);
    useEffect(() => {
        const updatePadding = () => {
            if (scrollRef.current)
                setPadding(scrollRef.current.clientWidth / 2);
        };
        updatePadding();
        window.addEventListener("resize", updatePadding);
        return () => window.removeEventListener("resize", updatePadding);
    }, []);
    const onScroll = useCallback(() => {
        if (!scrollRef.current)
            return;
        const sl = scrollRef.current.scrollLeft;
        setScrollLeft(sl);
        if (scrollAnimationFrame.current)
            cancelAnimationFrame(scrollAnimationFrame.current);
        scrollAnimationFrame.current = requestAnimationFrame(() => {
            const containerWidth = scrollRef.current.clientWidth;
            const centerIndex = Math.min(totalSeconds - 1, Math.max(0, Math.floor((sl + containerWidth / 2 - padding) / segmentWidth)));
            setCurrentIndex(centerIndex);
            setIsScrolling(true);
            onTimeChange === null || onTimeChange === void 0 ? void 0 : onTimeChange(centerIndex);
            if (hideTimeoutRef.current)
                clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1000);
        });
    }, [padding, segmentWidth, totalSeconds, onTimeChange]);
    useEffect(() => {
        return () => {
            if (scrollAnimationFrame.current)
                cancelAnimationFrame(scrollAnimationFrame.current);
        };
    }, []);
    const containerWidth = ((_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0;
    const visibleCount = Math.ceil(containerWidth / segmentWidth);
    const buffer = 200;
    const startIndex = Math.max(0, Math.floor((scrollLeft - padding) / segmentWidth) - buffer);
    const endIndex = Math.min(totalSeconds, startIndex + visibleCount + buffer * 2);
    const segments = useMemo(() => {
        const items = [];
        for (let i = startIndex; i < endIndex; i++) {
            items.push(_jsx(Segment, { idx: i, isVisible: visibleTimeSet.has(i), segmentWidth: segmentWidth, segmentHeight: segmentHeight, padding: padding, barStyle: barStyle, emptyBarColor: emptyBarColor }, i));
        }
        return items;
    }, [startIndex, endIndex, visibleTimeSet, segmentWidth, segmentHeight, padding, barStyle, emptyBarColor]);
    return (_jsx("div", { style: Object.assign({ fontFamily: "sans-serif", padding: 12, maxWidth, margin: "0 auto" }, containerStyle), children: _jsxs("div", { style: { position: "relative", height: segmentHeight / 2 }, children: [isScrolling && (_jsx("div", { style: Object.assign({ position: "absolute", left: "50%", top: -20, transform: "translateX(-50%)", padding: "2px 6px", backgroundColor: timeTextStyle.color || "#000", color: timeTextStyle.backgroundColor || "#fff", borderRadius: 4, fontSize: 11, whiteSpace: "nowrap", zIndex: 20, fontWeight: "bold", userSelect: "none" }, timeTextStyle), children: formatTime(currentIndex) })), _jsx("div", { style: Object.assign({ position: "absolute", top: 0, bottom: 0, width: 2, backgroundColor: midLineStyle.backgroundColor || "red", left: "50%", transform: "translateX(-1px)", zIndex: 10, height: midLineStyle.height || "100%" }, midLineStyle) }), _jsxs("div", { ref: scrollRef, onScroll: onScroll, style: Object.assign({ overflowX: "scroll", overflowY: "hidden", whiteSpace: "nowrap", border: "1px solid #ddd", height: segmentHeight, width: "100%", position: "relative", scrollbarWidth: "none", msOverflowStyle: "none" }, scrollContainerStyle), className: "timeline-scroll-container", children: [_jsx("style", { children: `.timeline-scroll-container::-webkit-scrollbar { display: none; }` }), _jsx("div", { style: {
                                position: "relative",
                                width: totalSeconds * segmentWidth + padding * 2,
                                height: segmentHeight,
                            }, children: segments })] })] }) }));
};
