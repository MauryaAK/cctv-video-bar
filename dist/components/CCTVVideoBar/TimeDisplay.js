import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const TimeDisplay = ({ value, timeTextStyle, timeTextContainerStyle }) => {
    return (_jsx("div", { style: Object.assign({ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 1, zIndex: 2, background: 'white', padding: '1px 6px', fontSize: '14px', borderRadius: 6, color: '#000', border: '.5px solid #000' }, timeTextContainerStyle), children: _jsx("span", { style: timeTextStyle, children: new Date(value * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'UTC',
            }) }) }));
};
export default React.memo(TimeDisplay);
