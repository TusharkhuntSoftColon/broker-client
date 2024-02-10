/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useDropzone, FileRejection } from 'react-dropzone';
import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import client from 'src/lib/client';
import ExcelLogo from 'src/assets/logos/excel.svg';
import { addSymbol } from 'src/store/slices/symbol';
import symbolService from 'src/services/symbolService';

import Image from '../image';
import { Upload } from '../upload';

interface ExcelUploadModalProps {
  open: boolean;
  onClose: () => void;
}

const SymbolExcelUploadModal = ({ open, onClose }: ExcelUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { mutate } = useMutation(symbolService.getSymbolList, {
    onSuccess: (data) => {
      const symbolData = data?.data?.rows;
      const newData = symbolData?.map((item: any) => ({
        ...item,
        exchange: {
          label: item?.exchange?.name,
          value: item?.exchange?._id,
        },
        orderType: item?.orderType?.map((order: string) => ({
          label: order,
          value: order,
        })),
        currency: {
          label: item?.currency,
          value: item?.currency,
        },
        statusOfScript: {
          label: item?.statusOfScript,
          value: item?.statusOfScript,
        },
      }));

      dispatch(addSymbol(newData));
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // Handle the dropped file
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    } else {
      console.error('File rejected:', fileRejections);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      '.xlsx': [],
      '.xls': [],
    },
  });

  const handleClose = () => {
    onClose();
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('importSymbol', file);

    try {
      // Send the FormData to the backend
      const response = await client.post('/symbol/bulk/import-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      mutate();
      handleClose();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (open) {
      setFile(null);
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 600 },
      }}
    >
      <DialogTitle>Upload Excel</DialogTitle>

      <DialogContent>
        <div>
          <div {...getRootProps()} style={{ cursor: 'pointer' }}>
            <input {...getInputProps()} />
            {/* <p>Drag and drop an Excel file here, or click to select one</p>
             */}

            {file ? (
              <div>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    padding: '10px',
                  }}
                >
                  <Image
                    src={ExcelLogo}
                    alt={ExcelLogo}
                    sx={{
                      height: '40%',
                      width: '40%',
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    marginTop: '10px',
                  }}
                >
                  Selected file: {file.name}
                </Typography>
              </div>
            ) : (
              <Upload
                accept={{
                  '.xlsx': [],
                  '.xls': [],
                }}
              />
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SymbolExcelUploadModal;
