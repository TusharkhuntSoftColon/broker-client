import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';

import PdfView from 'src/sections/report-pdf/PdfView';

const ReportPdfPage = () => {
  const { role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'ADMIN') router.push('/');
  }, []);
  return (
    <>
      <Helmet>Report pdf</Helmet>

      <PdfView />
    </>
  );
};

export default ReportPdfPage;
