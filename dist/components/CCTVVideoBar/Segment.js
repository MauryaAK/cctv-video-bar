import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import { formatTime } from "../utils/timeUtils";
export const Segment = memo(({ startIdx, length, isVisible, segmentWidth, segmentHeight, padding, barStyle, emptyBarColor }) => (_jsx("div", { title: formatTime(startIdx), className: `absolute transition-colors duration-200 ${isVisible ? 'bg-blue-600' : 'bg-gray-200'}`, style: Object.assign({ left: startIdx * segmentWidth + padding, width: length * segmentWidth, height: segmentHeight, backgroundColor: isVisible ? barStyle.backgroundColor || "#2563eb" : emptyBarColor || "#e5e7eb", boxSizing: "border-box" }, (!isVisible ? {} : barStyle)) })));
