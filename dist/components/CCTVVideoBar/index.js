import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect, useMemo, useCallback, } from "react";
import { getVisibleSecondsFromSegments, formatTime } from "../utils/timeUtils";
import { Segment } from "./Segment";
import { ScrollbarCanvas } from "./ScrollbarCanvas";
export const CCTVVideoBar = ({ totalSeconds = 86400, segmentWidth = 0.5, segmentHeight = 80, videoSegments = [], onTimeChange, value, containerStyle = {}, midLineStyle = {}, timeTextStyle = {}, timeTextContainerStyle = {}, barStyle = {}, emptyBarColor = "#fff", scrollContainerStyle = {}, maxWidth = "100%", scrollbarHeight = 10, scrollbarStyle = {}, scrollbarSegmentStyle = {}, viewportIndicatorStyle = {}, }) => {
    var _a, _b;
    const scrollRef = useRef(null);
    const scrollbarRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [userInteracting, setUserInteracting] = useState(false);
    const hideTimeoutRef = useRef(null);
    const lastScrollLeftRef = useRef(0);
    const lastValueRef = useRef(value);
    const lastInteractionTimeRef = useRef(0);
    const [padding, setPadding] = useState(0);
    const animationFrameRef = useRef(null);
    const visibleTimeSet = useMemo(() => getVisibleSecondsFromSegments(videoSegments), [videoSegments]);
    const containerWidth = ((_a = scrollRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) || 0;
    const totalScrollWidth = totalSeconds * segmentWidth + padding * 2;
    const updateCurrentIndex = useCallback((newIndex) => {
        const clampedIndex = Math.max(0, Math.min(totalSeconds - 1, newIndex));
        setCurrentIndex(clampedIndex);
        setIsScrolling(true);
        if (hideTimeoutRef.current)
            clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1000);
        onTimeChange === null || onTimeChange === void 0 ? void 0 : onTimeChange(clampedIndex);
    }, [totalSeconds, onTimeChange]);
    const scrollToValue = useCallback(() => {
        if (value === undefined || !scrollRef.current || userInteracting)
            return;
        if (value === lastValueRef.current)
            return;
        const now = performance.now();
        if (now - lastInteractionTimeRef.current < 1000)
            return;
        lastValueRef.current = value;
        const clampedValue = Math.max(0, Math.min(totalSeconds - 1, value));
        const targetScroll = clampedValue * segmentWidth + padding - scrollRef.current.clientWidth / 2;
        scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
        lastScrollLeftRef.current = targetScroll;
        updateCurrentIndex(clampedValue);
    }, [value, segmentWidth, padding, totalSeconds, userInteracting, updateCurrentIndex]);
    useEffect(() => {
        scrollToValue();
    }, [value, scrollToValue]);
    useEffect(() => {
        const updatePadding = () => {
            if (scrollRef.current) {
                setPadding(scrollRef.current.clientWidth / 2);
            }
        };
        updatePadding();
        window.addEventListener("resize", updatePadding, { passive: true });
        return () => window.removeEventListener("resize", updatePadding);
    }, []);
    const onScroll = useCallback(() => {
        if (!scrollRef.current)
            return;
        const scrollLeft = scrollRef.current.scrollLeft;
        if (Math.abs(scrollLeft - lastScrollLeftRef.current) < segmentWidth)
            return;
        lastScrollLeftRef.current = scrollLeft;
        const containerWidth = scrollRef.current.clientWidth;
        const centerIndexUnclamped = Math.round((scrollLeft + containerWidth / 2 - padding) / segmentWidth);
        const centerIndex = Math.min(totalSeconds - 1, Math.max(0, centerIndexUnclamped));
        updateCurrentIndex(centerIndex);
    }, [padding, segmentWidth, totalSeconds, updateCurrentIndex]);
    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            const handleScrollStart = () => {
                setUserInteracting(true);
                lastInteractionTimeRef.current = performance.now();
            };
            const handleScrollEnd = () => {
                setTimeout(() => setUserInteracting(false), 500);
            };
            scrollElement.addEventListener("scroll", onScroll, { passive: true });
            scrollElement.addEventListener("mousedown", handleScrollStart, { passive: true });
            scrollElement.addEventListener("touchstart", handleScrollStart, { passive: true });
            scrollElement.addEventListener("mouseup", handleScrollEnd, { passive: true });
            scrollElement.addEventListener("touchend", handleScrollEnd, { passive: true });
            return () => {
                scrollElement.removeEventListener("scroll", onScroll);
                scrollElement.removeEventListener("mousedown", handleScrollStart);
                scrollElement.removeEventListener("touchstart", handleScrollStart);
                scrollElement.removeEventListener("mouseup", handleScrollEnd);
                scrollElement.removeEventListener("touchend", handleScrollEnd);
            };
        }
    }, [onScroll]);
    const handleScrollTo = useCallback((scrollPosition) => {
        if (!scrollRef.current)
            return;
        const maxScroll = totalScrollWidth - scrollRef.current.clientWidth;
        const clampedScroll = Math.max(0, Math.min(maxScroll, scrollPosition));
        scrollRef.current.scrollTo({ left: clampedScroll, behavior: "smooth" });
        lastScrollLeftRef.current = clampedScroll;
        const containerWidth = scrollRef.current.clientWidth;
        const centerSecond = Math.round((clampedScroll + containerWidth / 2 - padding) / segmentWidth);
        const clampedSecond = Math.max(0, Math.min(totalSeconds - 1, centerSecond));
        updateCurrentIndex(clampedSecond);
    }, [segmentWidth, padding, totalSeconds, totalScrollWidth, updateCurrentIndex]);
    const onScrollbarClick = useCallback((e) => {
        if (!scrollRef.current || !scrollbarRef.current)
            return;
        const rect = scrollbarRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const scrollbarWidth = rect.width;
        const scrollFraction = clickX / scrollbarWidth;
        const targetScroll = scrollFraction * totalScrollWidth;
        handleScrollTo(targetScroll);
    }, [totalScrollWidth, handleScrollTo]);
    const onScrollbarMouseDown = useCallback((e) => {
        setUserInteracting(true);
        lastInteractionTimeRef.current = performance.now();
        onScrollbarClick(e);
        e.preventDefault();
    }, [onScrollbarClick]);
    const onScrollbarMouseMove = useCallback((e) => {
        if (!userInteracting || !scrollRef.current || !scrollbarRef.current)
            return;
        const rect = scrollbarRef.current.getBoundingClientRect();
        const moveX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const scrollbarWidth = rect.width;
        const scrollFraction = moveX / scrollbarWidth;
        const targetScroll = scrollFraction * totalScrollWidth;
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = requestAnimationFrame(() => {
            handleScrollTo(targetScroll);
        });
    }, [userInteracting, totalScrollWidth, handleScrollTo]);
    const onScrollbarMouseUp = useCallback(() => {
        setUserInteracting(false);
        lastInteractionTimeRef.current = performance.now();
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current);
    }, []);
    useEffect(() => {
        if (userInteracting) {
            window.addEventListener("mousemove", onScrollbarMouseMove, { passive: false });
            window.addEventListener("mouseup", onScrollbarMouseUp, { passive: true });
        }
        return () => {
            window.removeEventListener("mousemove", onScrollbarMouseMove);
            window.removeEventListener("mouseup", onScrollbarMouseUp);
            if (animationFrameRef.current)
                cancelAnimationFrame(animationFrameRef.current);
        };
    }, [userInteracting, onScrollbarMouseMove, onScrollbarMouseUp]);
    const segments = useMemo(() => {
        const items = [];
        let startIdx = 0;
        let isVisible = visibleTimeSet.has(0);
        let length = 1;
        for (let i = 1; i <= totalSeconds; i++) {
            const currentVisible = visibleTimeSet.has(i);
            if (currentVisible !== isVisible || i === totalSeconds) {
                items.push(_jsx(Segment, { startIdx: startIdx, length: length, isVisible: isVisible, segmentWidth: segmentWidth, segmentHeight: segmentHeight, padding: padding, barStyle: barStyle, emptyBarColor: emptyBarColor }, startIdx));
                startIdx = i;
                isVisible = currentVisible;
                length = 1;
            }
            else {
                length++;
            }
        }
        return items;
    }, [visibleTimeSet, segmentWidth, segmentHeight, padding, barStyle, emptyBarColor, totalSeconds]);
    const viewportWidth = useMemo(() => {
        if (!containerWidth || totalScrollWidth === 0)
            return 0;
        return Math.min(containerWidth, (containerWidth / totalScrollWidth) * containerWidth);
    }, [containerWidth, totalScrollWidth]);
    const viewportLeft = useMemo(() => {
        if (!scrollRef.current || !containerWidth || totalScrollWidth === 0)
            return 0;
        const scrollLeft = scrollRef.current.scrollLeft;
        const maxLeft = containerWidth - viewportWidth;
        const left = (scrollLeft / totalScrollWidth) * containerWidth;
        return Math.max(0, Math.min(left, maxLeft));
    }, [containerWidth, totalScrollWidth, viewportWidth, (_b = scrollRef.current) === null || _b === void 0 ? void 0 : _b.scrollLeft]);
    return (_jsxs(_Fragment, { children: [_jsx(_Fragment, { children: (isScrolling || value !== undefined) && (_jsx("div", { style: Object.assign({ display: 'flex', justifyContent: 'center', position: 'relative', top: '-0.2rem' }, timeTextContainerStyle), children: _jsx("div", { style: Object.assign({ padding: '0.25rem 0.5rem', backgroundColor: '#1f2937', color: 'white', borderRadius: '0.375rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', fontSize: '0.875rem', fontWeight: 600, whiteSpace: 'nowrap', justifyContent: 'center', alignItems: 'center', display: 'flex', zIndex: 20, width: 90 }, timeTextStyle), children: formatTime(currentIndex) }) })) }), _jsx("div", { style: Object.assign({ fontFamily: "Inter, sans-serif", maxWidth, margin: "0 auto", border: "2px solid #fe8f00", height: "78px", overflow: "hidden", borderRadius: "5px" }, containerStyle), children: _jsxs("div", { style: { position: "relative", height: segmentHeight / 2 }, children: [_jsx("div", { className: "absolute top-0 bottom-0 w-0.5 bg-red-500", style: Object.assign({ left: "50%", transform: "translateX(-0.25px)", zIndex: 10 }, midLineStyle) }), _jsx("div", { ref: scrollRef, style: Object.assign({ width: "100%", position: "relative", scrollBehavior: "smooth", overflow: 'scroll', overflowY: 'hidden', marginBottom: "-12px" }, scrollContainerStyle), children: _jsx("div", { style: {
                                    position: "relative",
                                    width: totalScrollWidth,
                                    height: segmentHeight,
                                }, children: segments }) }), _jsxs("div", { ref: scrollbarRef, onMouseDown: onScrollbarMouseDown, style: Object.assign({ height: scrollbarHeight, width: "100%", overflow: "hidden" }, scrollbarStyle), children: [_jsx(ScrollbarCanvas, { width: containerWidth, height: scrollbarHeight, videoSegments: videoSegments, totalSeconds: totalSeconds, segmentStyle: scrollbarSegmentStyle }), _jsx("div", { className: "absolute rounded-full", style: Object.assign({ transform: `translateX(${viewportLeft}px)`, width: viewportWidth, height: scrollbarHeight, backgroundColor: viewportIndicatorStyle.backgroundColor || "rgb(3 3 3 / 21%)", marginTop: "-10px", pointerEvents: "none", transition: userInteracting ? "none" : "transform 0.05s ease-out", willChange: "transform" }, viewportIndicatorStyle) })] })] }) })] }));
};
