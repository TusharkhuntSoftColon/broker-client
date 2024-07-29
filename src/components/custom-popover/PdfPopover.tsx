import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useRef, useState, useEffect, useCallback } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemButton from '@mui/material/ListItemButton';

import pdfService from 'src/services/pdfService';

import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { DownloadPdf } from 'src/sections/report-pdf/RenderPdf';

const PdfPopover = ({ userId }: { userId: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  const pdfPopover = usePopover();
  const downloadLinkRef = useRef<HTMLDivElement>(null);
  const [pdfData, setPdfData] = useState<{ data: any; number: number } | null>(null);
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  const { mutate, isLoading } = useMutation(
    async (pdfNumber: number) => {
      if (pdfNumber === 1) {
        return pdfService.getFirstPdf();
      }
      if (pdfNumber === 2) {
        return pdfService.getSecondPdf(userId);
      }
      return null;
    },
    {
      onSuccess: (data, pdfNumber) => {
        setPdfData({ data: data.data, number: pdfNumber });
        setIsDownloadReady(true);
      },
      onError: (error: any) => {
        const errorMessage = isAxiosError(error)
          ? error?.response?.data?.message || 'Failed to get PDF'
          : error?.message || 'Failed to get PDF';
        enqueueSnackbar(errorMessage, { variant: 'error' });
      },
      onSettled: () => {
        pdfPopover.onClose();
      },
    }
  );

  const handleDownloadPdf = useCallback(
    (pdfNum: number) => {
      if (!isLoading) {
        setIsDownloadReady(false);
        mutate(pdfNum);
      }
    },
    [isLoading, mutate]
  );

  useEffect(() => {
    if (isDownloadReady && pdfData && downloadLinkRef.current) {
      const link = downloadLinkRef.current.querySelector('a');
      if (link) {
        setTimeout(() => {
          link.click();
          setIsDownloadReady(false);
        }, 100);
      }
    }
  }, [isDownloadReady, pdfData]);

  return (
    <>
      <MenuItem
        sx={{
          fontWeight: 'fontWeightBold',
          fontSize: '14px',
          width: 'fit-content',
        }}
        onClick={pdfPopover.onOpen}
      >
        <MoreVertIcon />
      </MenuItem>
      <CustomPopover
        open={pdfPopover.open}
        onClose={pdfPopover.onClose}
        sx={{
          width: 120,
          p: 0,
        }}
      >
        <List sx={{ width: '100%', m: 1 }}>
          {[1, 2].map((num) => (
            <ListItem key={num} disablePadding>
              <ListItemButton
                sx={{ width: '100%' }}
                onClick={() => handleDownloadPdf(num)}
                disabled={isLoading}
              >
                <ListItemText primary={`Get pdf ${num}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CustomPopover>

      {pdfData && (
        <div ref={downloadLinkRef} style={{ display: 'none' }}>
          <PDFDownloadLink
            document={<DownloadPdf data={pdfData.data} pdfNumber={pdfData.number} />}
            fileName="document.pdf"
          >
            {({ loading, error }) =>
              (loading && 'Preparing document...') || (error && 'Error') || 'Download'
            }
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
};

export default PdfPopover;
