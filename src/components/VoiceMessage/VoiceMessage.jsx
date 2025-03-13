import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

const VoiceMessageRecorder = ({ onVoiceRecorded }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioBlob(audioBlob);
        setIsPreviewMode(true);

        // Stop all tracks to release the microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Could not access microphone. Please check your browser permissions."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const cancelRecording = () => {
    if (isRecording) {
      stopRecording();
      setAudioBlob(null);
    }
    setIsPreviewMode(false);
    setRecordingTime(0);
    setAudioBlob(null);
  };

  const sendVoiceMessage = () => {
    if (audioBlob) {
      onVoiceRecorded(audioBlob);
      setIsPreviewMode(false);
      setRecordingTime(0);
      setAudioBlob(null);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="voice-recorder flex items-center space-x-2">
      {!isRecording && !isPreviewMode ? (
        <button
          onClick={startRecording}
          className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
          title="Record voice message"
        >
          <FaMicrophone className="text-white" />
        </button>
      ) : isRecording ? (
        <div className="flex items-center space-x-2">
          <div className="recording-indicator flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm text-gray-300">
              {formatTime(recordingTime)}
            </span>
          </div>
          <button
            onClick={stopRecording}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FaStop className="text-white" />
          </button>
          <button
            onClick={cancelRecording}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FaTrash className="text-white" />
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <audio
            ref={audioRef}
            src={URL.createObjectURL(audioBlob)}
            controls
            className="h-8 w-40"
          />
          <button
            onClick={cancelRecording}
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <FaTrash className="text-white" />
          </button>
          <button
            onClick={sendVoiceMessage}
            className="p-2 px-4 rounded-lg bg-pink-600 hover:bg-pink-700 transition-colors text-white"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default VoiceMessageRecorder;

VoiceMessageRecorder.propTypes = {
  onVoiceRecorded: PropTypes.func.isRequired, // Ensures onVoiceRecorded is provided and is a function
};
