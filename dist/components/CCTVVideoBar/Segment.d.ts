import React from "react";
interface SegmentProps {
    idx: number;
    isVisible: boolean;
    segmentWidth: number;
    segmentHeight: number;
    padding: number;
    barStyle?: React.CSSProperties;
    emptyBarColor?: string;
}
export declare const Segment: React.MemoExoticComponent<({ idx, isVisible, segmentWidth, segmentHeight, padding, barStyle, emptyBarColor, }: SegmentProps) => import("react/jsx-runtime").JSX.Element>;
export {};
