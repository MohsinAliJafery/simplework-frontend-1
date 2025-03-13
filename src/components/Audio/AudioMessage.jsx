import React, { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { PropTypes } from 'prop-types';


const AudioMessage = ({ url, time }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
      <button 
        onClick={togglePlayPause} 
        className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
        >
        {isPlaying ? <FaPause className="text-white" /> : <FaPlay className="text-white" />}
      </button>
      
      <div className="flex-1">
        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-pink-500" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <audio 
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />
      
      <span className="text-xs text-gray-400 block">
        {time}
      </span>
    </div>
  );
};

export default AudioMessage;

AudioMessage.propTypes = {
    url: PropTypes.string.isRequired,   // Ensures url is a required string
    time: PropTypes.string.isRequired,   // Ensures time is a required string
  };