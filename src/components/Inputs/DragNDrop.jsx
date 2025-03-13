import React, { useState } from "react";
import "./DragNDrop.css";

const DragNDrop = ({ value, onChange, id,imageFile,selectedFile,setSelectedFile }) => {


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    onChange(file);
  };

  return (
    <div className="fis pt-4" >
      <label htmlFor={id} className="file-upload-label">
        <div className="file-upload-design flex flex-col items-center text-center">
          <svg viewBox="0 0 640 512" height="1em">
            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
          </svg>
          {selectedFile ? (
            <div>
            <p>{selectedFile.name}</p>
          </div>
          ) : (
            <div>
              <p>Drag & Drop Here Or</p>
              <p>Click The Upload Button To Browse</p>
              <span className="browse-button">Upload</span>
            </div>
          )}
        </div>
        <input
          id={id}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept={imageFile ? "image/*" : "*"}
        />
      </label>
    </div>
  );
};

export default DragNDrop;