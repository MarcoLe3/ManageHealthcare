import React, { useState, DragEvent, ChangeEvent } from "react";

interface UploadedFile {
  name: string;
  size: number;
}

const RecordCard: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
      name: file.name,
      size: file.size,
    }));
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      size: file.size,
    }));
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  return (
    <div className="p-4 w-full max-w-md bg-white rounded-lg shadow-lg">
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
        <label htmlFor="fileUpload" className="cursor-pointer mt-2 inline-block text-blue-500">
          Browse Files
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Uploaded Files:</h3>
          <ul className="space-y-1">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between border p-2 rounded">
                <span>{file.name}</span>
                <span className="text-gray-500 text-sm">{(file.size / 1024).toFixed(2)} KB</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecordCard;
