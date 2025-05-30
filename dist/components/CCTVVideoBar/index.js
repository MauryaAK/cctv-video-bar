import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { CCTVVideoBarProps } from "./types";
// import { formatTime, parseTimeToSeconds } from "./utils/timeUtils";
// const TOTAL_SECONDS = 86400;
// export const CCTVVideoBar: React.FC<CCTVVideoBarProps> = ({
//   segmentWidth = 2,
//   segmentHeight = 180,
//   containerHeight = 220,
//   videoSegments,
//   onTimeChange,
//   containerStyle = {},
//   midLineStyle = {},
//   timeContainerStyle = {},
//   timeTextStyle = {},
//   barStyle = {},
//   scrollContainerStyle = {},
// }) => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [padding, setPadding] = useState(0);
//   const hideTimeoutRef = useRef<any>(null);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const availabilityArray = useMemo(() => {
//     const array = Array(TOTAL_SECONDS).fill(false);
//     videoSegments.forEach(({ startTime, endTime }) => {
//       const start = parseTimeToSeconds(startTime);
//       const end = parseTimeToSeconds(endTime);
//       for (let i = start; i <= end; i++) {
//         array[i] = true;
//       }
//     });
//     return array;
//   }, [videoSegments]);
//   useEffect(() => {
//     const updatePadding = () => {
//       if (scrollRef.current) {
//         setPadding(scrollRef.current.clientWidth / 2);
//       }
//     };
//     updatePadding();
//     window.addEventListener("resize", updatePadding);
//     return () => window.removeEventListener("resize", updatePadding);
//   }, []);
//   const onScroll = () => {
//     if (!scrollRef.current) return;
//     const scrollLeft = scrollRef.current.scrollLeft;
//     const centerIndex = Math.floor((scrollLeft + scrollRef.current.clientWidth / 2 - padding) / segmentWidth);
//     const clamped = Math.max(0, Math.min(centerIndex, TOTAL_SECONDS - 1));
//     setCurrentIndex(clamped);
//     onTimeChange?.(clamped);
//     setIsScrolling(true);
//     clearTimeout(hideTimeoutRef.current);
//     hideTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1000);
//   };
//   return (
//     <div style={{ fontFamily: "sans-serif", padding: 10, ...containerStyle }}>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, ...timeContainerStyle }}>
//         <span style={{ ...timeTextStyle }}>Current Time: <strong>{formatTime(currentIndex)}</strong></span>
//       </div>
//       <div style={{ position: "relative", height: containerHeight }}>
//         {isScrolling && (
//           <div
//             style={{
//               position: "absolute",
//               top: -20,
//               left: "50%",
//               transform: "translateX(-50%)",
//               backgroundColor: "#000",
//               color: "#fff",
//               padding: "2px 6px",
//               borderRadius: 4,
//               fontSize: 12,
//               zIndex: 20,
//             }}
//           >
//             {formatTime(currentIndex)}
//           </div>
//         )}
//         <div
//           style={{
//             position: "absolute",
//             top: 0,
//             bottom: 0,
//             width: 2,
//             backgroundColor: midLineStyle.backgroundColor || "red",
//             height: midLineStyle.height || "100%",
//             left: "50%",
//             transform: "translateX(-1px)",
//             zIndex: 10,
//             ...midLineStyle,
//           }}
//         />
//         <div
//           ref={scrollRef}
//           onScroll={onScroll}
//           style={{
//             overflowX: "auto",
//             overflowY: "hidden",
//             whiteSpace: "nowrap",
//             height: containerHeight,
//             width: "100%",
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//             ...scrollContainerStyle,
//           }}
//         >
//           <div
//             style={{
//               display: "inline-block",
//               minWidth: TOTAL_SECONDS * segmentWidth,
//               paddingLeft: padding,
//               paddingRight: padding,
//               height: containerHeight,
//             }}
//           >
//             {availabilityArray.map((available, idx) => (
//               <div
//                 key={idx}
//                 title={formatTime(idx)}
//                 style={{
//                   display: "inline-block",
//                   width: segmentWidth,
//                   height: segmentHeight,
//                   backgroundColor: available ? barStyle.backgroundColor || "#28a745" : barStyle.emptyBarColor || "#fff",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
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
