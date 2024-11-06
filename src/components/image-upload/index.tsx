import React, { useState } from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import { DropZone } from './styles';

interface ImageUploadProps {
    onFileSelect?: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            if (onFileSelect) onFileSelect(selectedFile);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            if (onFileSelect) onFileSelect(selectedFile);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreview(null);
        if (onFileSelect) onFileSelect(null);
    };

    return (
        <Box>
            {!file ? (
                <DropZone
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    component="label"
                    sx={{ minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            backgroundColor: '#e0e0e0',
                            margin: '0 auto 10px auto',
                        }}
                    >
                        <ImageIcon sx={{ fontSize: 30, color: '#777' }} />
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        Arraste e solte o arquivo aqui ou{' '}
                        <Link
                            component="span"
                            underline="hover"
                            color="primary"
                            onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                        >
                            escolha um arquivo
                        </Link>
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                        Formatos suportados: JPEG, PNG, GIF
                    </Typography>
                </DropZone>
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 1, mt: 2, backgroundColor: '#f4f4f4' }}
                >
                    <ImageIcon sx={{ fontSize: 40, color: '#757575', mr: 2 }} />
                    <Box flex="1">
                        <Typography variant="body2">{file.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Typography>
                    </Box>
                    <Link
                        href={preview || '#'}
                        target="_blank"
                        underline="hover"
                        color="primary"
                        sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
                    >
                        <VisibilityIcon sx={{ fontSize: 20, mr: 0.5 }} />
                    </Link>
                    <Link
                        href={preview || '#'}
                        download={file?.name}
                        underline="hover"
                        color="primary"
                        sx={{ display: 'flex', alignItems: 'center', mr: 1 }}
                    >
                        <DownloadIcon sx={{ fontSize: 20, mr: 0.5 }} />
                    </Link>
                    <IconButton onClick={handleRemoveFile} sx={{ width: 20, height: 20 }}>
                        <DeleteIcon color="primary" sx={{ width: 20, height: 20 }} />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default ImageUpload;
