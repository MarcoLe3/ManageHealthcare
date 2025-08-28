import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

const RecordCard = () => {
  const [pdfs, setPdfs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageNavigation = pageNavigationPlugin();

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPdfs = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setPdfs((prev) => [...prev, ...newPdfs]);
    if (pdfs.length === 0) setCurrentIndex(0);
  };

  const handleRemove = () => {
    const updated = pdfs.filter((_, i) => i !== currentIndex);
    setPdfs(updated);
    if (currentIndex >= updated.length) {
      setCurrentIndex(Math.max(0, updated.length - 1));
    }
  };

  const handleNext = () => {
    if (pdfs.length > 1) setCurrentIndex((prev) => (prev + 1) % pdfs.length);
  };

  const handlePrev = () => {
    if (pdfs.length > 1)
      setCurrentIndex((prev) => (prev - 1 + pdfs.length) % pdfs.length);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold text-white">Document</h2>

      <label className="cursor-pointer flex items-center gap-2 rounded-lg hover:bg-[#48484A] text-white px-4 py-2 font-semibold">
        <img src="/plus.png" className="w-4 h-4" alt="" />
        Upload PDF
        <input
          type="file"
          accept="application/pdf"
          multiple
          hidden
          onChange={handleUpload}
        />
      </label>
    </div>

      {pdfs.length > 0 && (
        <div className="w-full h-[500px] overflow-hidden">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfs[currentIndex].url} plugins={[pageNavigation]} defaultScale={0.6} />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default RecordCard;