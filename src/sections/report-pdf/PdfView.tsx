import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

import { Box, Button, Container } from '@mui/material';

import useAuth from 'src/hooks/useAuth';

import pdfService from 'src/services/pdfService';

import { useSettingsContext } from 'src/components/settings';

import RenderPdf from './RenderPdf';

const PdfView = () => {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState<any>();
  const [selectedPdf, setSelectedPdf] = useState<number>(0);
  const { _id } = useAuth();

  const { mutate: fetchPdf, isLoading } = useMutation(
    async (pdfNumber: number) => {
      if (pdfNumber === 1) {
        return pdfService.getFirstPdf();
      }
      if (pdfNumber === 2) {
        return pdfService.getSecondPdf(_id);
      }
      return null;
    },
    {
      onSuccess: (response) => {
        setData(response.data);
      },
      onError: (error: any) => {
        const errorMessage = isAxiosError(error)
          ? error?.response?.data?.message || 'Failed to get PDF'
          : error?.message || 'Failed to get PDF';
        enqueueSnackbar(errorMessage, { variant: 'error' });
      },
    }
  );

  const handleViewPdf = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pdfNumber = parseInt(e.currentTarget.name, 10);
    setSelectedPdf(pdfNumber);
    fetchPdf(pdfNumber);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box mt={4}>
        <Button
          variant="contained"
          name="1"
          sx={{ marginRight: '1rem' }}
          onClick={handleViewPdf}
          disabled={isLoading}
        >
          View PDF 1
        </Button>
        <Button
          variant="contained"
          name="2"
          sx={{ marginRight: '1rem' }}
          onClick={handleViewPdf}
          disabled={isLoading}
        >
          View PDF 2
        </Button>
      </Box>

      <Box maxWidth="90%" mx="auto">
        {data && <RenderPdf data={data} pdfNumber={selectedPdf} />}
      </Box>
    </Container>
  );
};

export default PdfView;
