import client from 'src/lib/client';

const pdfService = {
  getFirstPdf: async (_id: string | null) => {
    try {
      const response = await client.get(`pdf/weekly-pdf-admin/${_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getSecondPdf: async () => {
    try {
      const response = await client.get('pdf/generate');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default pdfService;
