import React, { useState } from "react";
import type { TextContent, TextItem } from "pdfjs-dist/types/src/display/api";
import { MdCloudUpload, MdDescription } from "react-icons/md";

type Props = {
  setResumeText: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResumeUploader: React.FC<Props> = ({ setResumeText, setIsLoading }) => {
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const mergeTextContent = (textContent: TextContent) => {
    return textContent.items
      .map(item => {
        const { str, hasEOL } = item as TextItem;
        return str + (hasEOL ? "\n" : "");
      })
      .join("");
  };

  const readResume = async (pdfFile: File | undefined) => {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    if (!pdfFile) return;

    const reader = new FileReader();
    reader.onload = async event => {
      const arrayBuffer = event.target?.result;
      if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
        const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer));
        loadingTask.promise.then(
          pdfDoc => {
            pdfDoc.getPage(1).then(page => {
              page.getTextContent().then(textContent => {
                const extractedText = mergeTextContent(textContent);
                setResumeText(extractedText);
              });
            });
          },
          reason => {
            console.error(`Error during PDF loading: ${reason}`);
          }
        );
      }
    };
    reader.readAsArrayBuffer(pdfFile);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setResumeText("");
    setError("");
    setIsLoading(true);

    try {
      const items = event.dataTransfer.items;

      if (!items || items.length !== 1) {
        throw new Error("Please drop a single file.");
      }
      const item = items[0];

      if (item.kind !== "file" || item.type !== "application/pdf") {
        throw new Error("Please drop a single PDF file.");
      }
      const file = item.getAsFile();

      if (!file) {
        throw new Error("The PDF wasn't uploaded correctly.");
      }
      setFileName(file.name);
      await readResume(file);
    } catch (error) {
      console.log(error);
      setError("There was an error reading the resume. Please try again.");
      setFileName("");
    }
    setIsLoading(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleButtonUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setIsLoading(true);
    setResumeText("");

    try {
      const file = event.target.files?.[0];
      if (!file) {
        setError("The PDF wasn't uploaded correctly.");
        setFileName("");
        setIsLoading(false);
        return;
      }
      setFileName(file.name);
      await readResume(file);
    } catch (error) {
      console.log(error);
      setError("There was an error reading the resume. Please try again.");
      setFileName("");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div
        className={`flex flex-col justify-center items-center mt-5 p-5 border-2 border-dashed rounded-lg transition-colors ease-in-out duration-300 ${
          isDragOver ? "border-yellow-400 bg-yellow-100/10 shadow-md" : "border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={() => setIsDragOver(false)}
      >
        <input type="file" id="file-upload" onChange={handleButtonUpload} accept="application/pdf" hidden />
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-300 border-2 border-yellow-200 rounded-full px-4 py-2 text-gray-900 cursor-pointer transition-transform transform hover:scale-105 shadow-md"
        >
          <MdCloudUpload /> Upload resume
        </label>

        {fileName && (
          <div className="mt-4 flex items-center gap-2 text-black">
            <MdDescription className="text-yellow-500" />
            <span className="text-sm font-medium">{fileName}</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default ResumeUploader;
