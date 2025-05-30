import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import { formatTime } from "./utils/timeUtils";
export const Segment = memo(({ idx, isVisible, segmentWidth, segmentHeight, padding, barStyle, emptyBarColor = "#fff", }) => {
    var _a;
    return (_jsx("div", { title: formatTime(idx), style: Object.assign({ position: "absolute", left: idx * segmentWidth + padding, width: segmentWidth, height: segmentHeight, backgroundColor: isVisible ? ((_a = barStyle === null || barStyle === void 0 ? void 0 : barStyle.backgroundColor) !== null && _a !== void 0 ? _a : "#007bff") : emptyBarColor, boxSizing: "border-box" }, (isVisible ? barStyle : {})) }));
});
