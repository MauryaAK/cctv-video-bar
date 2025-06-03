export type VideoSegment = {
    start_time: string | Date;
    end_time: string | Date;
};
export type Style = React.CSSProperties;
export type CCTVVideoBarProps = {
    totalSeconds?: number;
    segmentWidth?: number;
    segmentHeight?: number;
    videoSegments?: VideoSegment[];
    onTimeChange?: (timeInSeconds: number) => void;
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
};
export type SegmentProps = {
    startIdx: number;
    length: number;
    isVisible: boolean;
    segmentWidth: number;
    segmentHeight: number;
    padding: number;
    barStyle: Style;
    emptyBarColor: string;
};
