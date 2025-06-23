export type Style = React.CSSProperties;
export type VideoSegmentInput = {
    startTime?: string;
    endTime?: string;
    start_time?: string | Date;
    end_time?: string | Date;
};
export type SegmentResult = {
    start: number;
    end: number;
};
export type ProgressScaleProp = {
    segmentHeight?: number;
    onTimeChange: (timeInSeconds: number) => void;
    value?: number;
    containerStyle?: Style;
    midLineStyle?: Style;
    timeTextStyle?: Style;
    timeTextContainerStyle?: Style;
    barStyle?: Style;
    emptyBarColor?: string;
    scrollContainerStyle?: Style;
    maxWidth?: string;
    scrollbarHeight?: number;
    scrollbarStyle?: Style;
    scrollbarSegmentStyle?: Style;
    viewportIndicatorStyle?: Style;
    timeVisibility?: boolean;
    segments: VideoSegmentInput[][];
    tickIntervalFont?: number;
    tickIntervalTextColor?: string;
};
export type MidLineProps = {
    midLineStyle?: Style;
};
export type MiniMapCanvasProps = {
    selectedTime: number | null;
    segments: {
        start: number;
        end: number;
    }[][];
    minTime: number;
    maxTime: number;
    scrollbarHeight: number;
    scrollbarStyle?: Style;
    scrollbarSegmentStyle?: Style;
    viewportIndicatorStyle?: Style;
    onMiniMapClick: (e: React.MouseEvent, miniMapRef: React.RefObject<HTMLCanvasElement>) => void;
};
export type TimeDisplayProps = {
    value: number;
    timeTextStyle?: Style;
    timeTextContainerStyle?: Style;
};
export type TimelineCanvasProps = {
    segments: {
        start: number;
        end: number;
    }[][];
    minTime: number;
    maxTime: number;
    timeSpan: number;
    totalPixelWidth: number;
    canvasHeight: number;
    barStyle?: Style;
    emptyBarColor: string;
    rowHeight: number;
    tickIntervalFont: number;
    tickIntervalTextColor: string;
};
