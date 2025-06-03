import React from "react";
import { Style, VideoSegment } from "./types";
export declare const ScrollbarCanvas: React.MemoExoticComponent<({ width, height, videoSegments, totalSeconds, segmentStyle, }: {
    width: number;
    height: number;
    videoSegments: VideoSegment[];
    totalSeconds: number;
    segmentStyle: Style;
}) => import("react/jsx-runtime").JSX.Element>;
