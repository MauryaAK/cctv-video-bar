import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const MidLine = ({ midLineStyle }) => {
    return (_jsx("div", { style: Object.assign({ position: 'absolute', left: '50%', top: 20, bottom: 0, width: '2px', backgroundColor: 'red', zIndex: 1, transform: 'translateX(-1px)' }, midLineStyle) }));
};
export default React.memo(MidLine);
