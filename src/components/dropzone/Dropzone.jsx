import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop, accept, minSize, maxSize, multiple, ...rest }) => {
    const { getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles } = useDropzone({
        onDrop,
        accept,
        minSize,
        maxSize,
        multiple,
    });

    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {!isDragActive && 'Click here or drop a file to upload!'}
            {isDragActive && !isDragReject && "Drop it like it's hot!"}
            {isDragReject && 'File type not accepted, sorry!'}
            {isFileTooLarge && (
                <div className="text-danger mt-2">
                    File is too large.
                </div>
            )}
        </div>
    );
}


export default Dropzone;