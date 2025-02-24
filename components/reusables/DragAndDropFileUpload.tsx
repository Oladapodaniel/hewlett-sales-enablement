import React, { useState, DragEvent, ChangeEvent, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UploadCloudIcon } from 'lucide-react';

export default function DragAndDropUpload() {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;
        setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    };

    const removeFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };


    return (
        <>
            <motion.div
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors duration-300 cursor-pointer mb-4 ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <UploadCloudIcon size={'40'} className='text-gray-500' />
                <p className="text-gray-500 mb-2 mt-3 text-center text-xl">Drag 'n' drop files here, or click to select files</p>
                <input
                    ref={fileInputRef}
                    id="fileInput"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelection}
                />
            </motion.div>

            <div className="space-y-2">
                {files.length > 0 && (
                    <p className="text-gray-700 mb-2 font-semibold">Files:</p>
                )}
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2"
                    >
                        <span className="text-gray-600 text-sm mr-2">{file.name}</span>
                        <Button variant="destructive" onClick={() => removeFile(index)} size="sm">
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </>

    );
}
