// RecordCard.tsx
import React, { useState, DragEvent, ChangeEvent } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface UploadedFile {
  file: File;
  previewURL: string;
}

const RecordCard: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (currentIndex >= files.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextFile = () => {
    setCurrentIndex((prev) => (prev + 1) % files.length);
  };

  const prevFile = () => {
    setCurrentIndex((prev) => (prev - 1 + files.length) % files.length);
  };

  return (
    <div className="p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
      {/* Upload area */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag & drop files here or click to upload</p>
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          id="fileUpload"
        />
        <label
          htmlFor="fileUpload"
          className="cursor-pointer mt-2 inline-block text-blue-500"
        >
          Browse Files
        </label>
      </div>

      {/* File preview */}
      {files.length > 0 && (
        <div className="mt-4 relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">
              {files[currentIndex].file.name}
            </h3>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeFile(currentIndex)}
            >
              Remove
            </button>
          </div>

          <div className="h-64 border rounded p-2 flex items-center justify-center bg-gray-50">
            {files[currentIndex].file.type === "application/pdf" ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={files[currentIndex].previewURL} />
              </Worker>
            ) : (
              <img
                src={files[currentIndex].previewURL}
                alt={files[currentIndex].file.name}
                className="max-h-full max-w-full"
              />
            )}
          </div>

          {/* Navigation for multiple files */}
          {files.length > 1 && (
            <div className="flex justify-between mt-2">
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={prevFile}
              >
                Prev
              </button>
              <span>
                {currentIndex + 1} / {files.length}
              </span>
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={nextFile}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecordCard;
