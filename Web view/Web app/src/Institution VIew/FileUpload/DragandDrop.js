import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function DropzoneComponent(props) {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        ]);
    }, []);

    const removeFile = (file) => {
        setFiles(prevFiles => prevFiles.filter(f => f !== file));
        URL.revokeObjectURL(file.preview);
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png, application/pdf'
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const thumbs = files.map(file => (
        <div key={file.name}>
            {file.type.includes('image') ? (
                <div>
                    <img
                        src={file.preview}
                        alt={file.name}
                    />
                    <button className="btn btn-danger" onClick={() => removeFile(file)}>
                        Remove
                    </button>
                </div>
            ) : (
                <div>
                    <span>{file.name}</span>
                    <br />
                    <a href={file.preview} target="_blank" rel="noopener noreferrer">
                        View PDF
                    </a>
                    <IconButton onClick={() => removeFile(file)}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            )}
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <div className="card">
            <div className="card-body">
                <section>
                    <div {...getRootProps({ style })}>
                        <input {...getInputProps()} />
                        <div>Click here or Drag and drop your images or PDFs here.</div>
                    </div>
                    <aside>
                        {thumbs}
                    </aside>
                </section>
            </div>
        </div>
    );
}

export default DropzoneComponent;
