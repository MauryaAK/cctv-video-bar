# cctv-video-bar

*A customizable React timeline component to visualize 24-hour CCTV video availability. Easily highlight recorded video segments and navigate to specific times using a scrollable interface.*

![npm version](https://img.shields.io/badge/version-2.0.6-blue?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/cctv-video-bar?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![bundle size](https://img.shields.io/badge/bundle%20size-19.7-brightgreen?style=flat-square)

---

## Installation

```bash
npm install cctv-video-bar
```

## Usage

```tsx
import { CCTVVideoBar, VideoSegment } from "cctv-video-bar";

const App = () => {
  const segments: VideoSegment[] = [
    { startTime: "12:00am", endTime: "12:01am" },
    { startTime: "12:03am", endTime: "12:07am" },
    { startTime: "12:08am", endTime: "12:09am" },
    { startTime: "01:20am", endTime: "01:30am" },
    { startTime: "03:30am", endTime: "04:45am" },
    { startTime: "06:00am", endTime: "07:20am" },
    { startTime: "09:10am", endTime: "10:00am" },
    { startTime: "12:25pm", endTime: "01:15pm" },
    { startTime: "03:50pm", endTime: "04:30pm" },
    { startTime: "07:10pm", endTime: "08:00pm" },
    { startTime: "10:35pm", endTime: "11:20pm" },
  ];

  return (
    <CCTVVideoBar
      segmentWidth={2}
      segmentHeight={180}
      videoSegments={segments}
      onTimeChange={(e) => console.log("Time:", e)}
      containerStyle={{ backgroundColor: "#fff", height: 200 }}
      midLineStyle={{ backgroundColor: "orange", height: "90%" }}
      timeContainerStyle={{ justifyContent: "space-between" }}
      timeTextStyle={{ color: "#333", backgroundColor: "#ddd", fontSize: 14 }}
      barStyle={{ backgroundColor: "#28a745" }}
      scrollContainerStyle={{ borderRadius: 8, borderColor: "#999" }}
    />
  );
};

export default App;
```


## Props

| Prop                   | Type                     | Description                                                                 |
|------------------------|--------------------------|-----------------------------------------------------------------------------|
| `segmentWidth`         | `number`                 | Width of each video segment in pixels.                                      |
| `segmentHeight`        | `number`                 | Height of the video timeline bar.                                           |
| `videoSegments`        | `VideoSegment[]`         | Array of recorded video segments with `startTime` and `endTime`.            |
| `onTimeChange`         | `(time: string) => void` | Callback fired when the user navigates to a different time on the timeline. |
| `containerStyle`       | `React.CSSProperties`    | Custom styles for the container element.                                    |
| `midLineStyle`         | `React.CSSProperties`    | Styles for the vertical midline indicator.                                  |
| `timeContainerStyle`   | `React.CSSProperties`    | Styles for the time labels container.                                       |
| `timeTextStyle`        | `React.CSSProperties`    | Styles for the time label text.                                             |
| `barStyle`             | `React.CSSProperties`    | Styles for the recorded video segments bar.                                 |
| `scrollContainerStyle` | `React.CSSProperties`    | Styles for the scroll container wrapping the timeline.                      |


## License

This project is licensed under the [MIT License](https://github.com/MauryaAK/cctv-video-bar/blob/main/LICENSE).
