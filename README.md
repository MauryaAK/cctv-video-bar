

# cctv-video-bar

*A highly customizable React timeline component for CCTV video playback. Visualize and navigate through recorded video segments with an interactive scrollable timeline.*

![npm version](https://img.shields.io/badge/version-2.0.6-blue?style=flat-square) ![npm downloads](https://img.shields.io/npm/dm/cctv-video-bar?style=flat-square) ![license](https://img.shields.io/badge/license-MIT-green?style=flat-square) ![bundle size](https://img.shields.io/badge/bundle%20size-19.7-brightgreen?style=flat-square)

![Screenshot 1](assets/img2.png)
---

## Installation

```bash
npm install cctv-video-bar
```

## Usage

```tsx
import  CCTVVideoBar  from "cctv-video-bar";

const App = () => {
    const segments = [
    { startTime: "12:00am", endTime: "12:01am" },
    { startTime: "12:03am", endTime: "12:07am" },
    { startTime: "12:08am", endTime: "12:09am" },
    { startTime: "01:20am", endTime: "01:30am" },
    { startTime: "03:30am", endTime: "04:45am" },
    { startTime: "06:00am", endTime: "07:20am" },
    { startTime: "09:10am", endTime: "10:00am" },
    { startTime: "12:25pm", endTime: "01:15pm" },
    { start_time: "01:46:58", end_time: "02:47:13" }, 
    { start_time: "03:06:58", end_time: "05:04:13" },// <================Currently, we accept three different time formats.
    { start_time: new Date(), end_time: new Date() },// <================Currently, we accept three different time formats.
    { start_time: "2025-05-31 08:38:51", end_time: "2025-05-31 08:43:52" },// <=========Currently, we accept three different time formats.
  ];

  return (
    <CCTVVideoBar
      segmentHeight={60}
      onTimeChange={(t) => console.log("Time changed:", t)}
      value={3600}
      containerStyle={{}}
      midLineStyle={{}}
      timeTextStyle={{}}
      timeTextContainerStyle={{}}
      barStyle={{}}
      emptyBarColor="#d1d5db"
      scrollContainerStyle={{}}
      maxWidth="100%"
      scrollbarHeight={10}
      scrollbarStyle={{}}
      scrollbarSegmentStyle={{}}
      viewportIndicatorStyle={{}}
      timeVisibility={true}
      segments={segments}
      tickIntervalFont={12}
      tickIntervalTextColor="#555"
    />
  );
};
```

## Props

| Prop                     | Type                              | Description                                                 |
| ------------------------ | --------------------------------- | ----------------------------------------------------------- |
| `segmentHeight`          | `number`                          | The height of each segment in pixels.                       |
| `onTimeChange`           | `(timeInSeconds: number) => void` | Callback fired when the user navigates to a different time. |
| `value`                  | `number`                          | The currently selected time in seconds.                     |
| `containerStyle`         | `React.CSSProperties`             | Styles for the outer container.                             |
| `midLineStyle`           | `React.CSSProperties`             | Styles for the midline indicator.                           |
| `timeTextStyle`          | `React.CSSProperties`             | Styles for the time labels.                                 |
| `timeTextContainerStyle` | `React.CSSProperties`             | Styles for the container holding the time labels.           |
| `barStyle`               | `React.CSSProperties`             | Styles for the video segment bar.                           |
| `emptyBarColor`          | `string`                          | Color for the empty portions of the timeline.               |
| `scrollContainerStyle`   | `React.CSSProperties`             | Styles for the scrollable area.                             |
| `maxWidth`               | `string`                          | Maximum width for the timeline.                             |
| `scrollbarHeight`        | `number`                          | Height of the scrollbar.                                    |
| `scrollbarStyle`         | `React.CSSProperties`             | Styles for the scrollbar.                                   |
| `scrollbarSegmentStyle`  | `React.CSSProperties`             | Styles for the scrollbar segments.                          |
| `viewportIndicatorStyle` | `React.CSSProperties`             | Styles for the viewport indicator.                          |
| `timeVisibility`         | `boolean`                         | Toggle visibility of time labels.                           |
| `segments`               | `VideoSegmentInput[][]`           | An array of video segment inputs.                           |
| `tickIntervalFont`       | `number`                          | Font size for tick interval text.                           |
| `tickIntervalTextColor`  | `string`                          | Color for tick interval text.                               |

## License

This project is licensed under the [MIT License](https://github.com/MauryaAK/cctv-video-bar/blob/main/LICENSE).
