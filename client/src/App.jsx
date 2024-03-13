import React, { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Button } from "./components/Button";
import { Inputfile } from "./components/Inputfile";
import { Header } from "./components/Header";
import { Resultimg } from "./components/Resultimage";
import { Inputvideo } from "./components/Inputvideo";
import { Dbutton } from "./components/Dbutton";

const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState();
  const [gif, setGif] = useState();
  const [notification, setNotification] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(10);
  const downloadInitiatedRef = useRef(false);

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    return () => {
      downloadInitiatedRef.current = false;
    };
  }, []);

  const convertToGif = async () => {
    setNotification("Converting to GIF...");

    ffmpeg.FS("writeFile", "video1.mp4", await fetchFile(video));

    await ffmpeg.run(
      "-i",
      "video1.mp4",
      "-t",
      `${endTime - startTime}`,
      "-ss",
      `${startTime}`,
      "-f",
      "gif",
      "out.gif"
    );

    const data = ffmpeg.FS("readFile", "out.gif");
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    setGif(url);
    setNotification("GIF created successfully! Swipe Down.");
  };

  const download = (e) => {
    if (!downloadInitiatedRef.current && gif) {
      downloadInitiatedRef.current = true;

      console.log(e.target.href);
      fetch(e.target.href, {
        method: "GET",
        headers: {},
      })
        .then((response) => {
          response.arrayBuffer().then(function (buffer) {
            const url = window.URL.createObjectURL(new Blob([buffer]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "image.gif");
            document.body.appendChild(link);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Memoize the video component to prevent unnecessary re-renders
  const memoizedVideoComponent = useMemo(() => {
    return video && <Inputvideo video={video} />;
  }, [video]);

  return ready ? (
    <div className="App">
      <Header />
      {memoizedVideoComponent}
      <Inputfile setVideo={setVideo} />
      <label>
        Start Time: {startTime}s
        <input
          type="range"
          min="0"
          max="100"
          value={startTime}
          onChange={(e) => setStartTime(Number(e.target.value))}
        />
      </label>
      <label>
        End Time: {endTime}s
        <input
          type="range"
          min="0"
          max="100"
          value={endTime}
          onChange={(e) => setEndTime(Number(e.target.value))}
        />
      </label>
      <p></p>
      {notification && <p>{notification}</p>}
      <Button convertToGif={convertToGif} />
      <h1>Result</h1>
      {gif && <Resultimg gif={gif} />}
      {gif && <Dbutton gif={gif} download={download} />}
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App;
