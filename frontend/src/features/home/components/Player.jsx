import React, { useContext, useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/player.scss";

const Player = () => {
  const { song } = useSong() || {};
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (song && song.url) {
      audio.src = song.url;
      audio.load();
      setCurrentTime(0);
      setDuration(0);
      setPlaying(false);
    }
  }, [song]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const seek = (time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(
      0,
      Math.min(duration || 0, audio.currentTime + time),
    );
    setCurrentTime(audio.currentTime);
  };

  const onProgressChange = (e) => {
    const val = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = val;
    setCurrentTime(val);
  };

  const fmt = (s = 0) => {
    const mm = Math.floor(s / 60);
    const ss = Math.floor(s % 60);
    return `${mm}:${ss.toString().padStart(2, "0")}`;
  };

  return (
    <div className="player">
      <audio ref={audioRef} />

      {song?.posterUrl && (
        <div className="poster-container">
          <img src={song.posterUrl} alt="Album art" className="poster" />
        </div>
      )}

      <div className="song-info">
        <h3>{song?.title || "No song playing"}</h3>
        <p>{song?.artist || ""}</p>
      </div>

      <div className="player-row">
        <button onClick={() => seek(-5)} title="Back 5s">
          « 5s
        </button>
        <button onClick={togglePlay} title="Play / Pause">
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={() => seek(5)} title="Forward 5s">
          5s »
        </button>
      </div>

      <div className="progress-row">
        <span className="time">{fmt(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={onProgressChange}
          step="0.1"
        />
        <span className="time">{fmt(duration)}</span>
      </div>

      <div className="controls-row">
        <div className="volume-control">
          <label htmlFor="volume">🔊</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
          <span>{Math.round(volume * 100)}%</span>
        </div>

        <div className="speed-control">
          <label htmlFor="speed">Speed:</label>
          <select
            id="speed"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Player;
