"use client";
import { useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopMusic = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // reset to start
    setIsPlaying(false);
  };

  return (
    <div className="p-4">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {!isPlaying ? (
        <button
          onClick={startMusic}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          ▶ Play Music
        </button>
      ) : (
        <button
          onClick={stopMusic}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          ⏹ Stop Music
        </button>
      )}
    </div>
  );
}
