import client from 'src/lib/client';

const pdfService = {
  getFirstPdf: async () => {
    try {
      const response = await client.get('pdf/generate');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getSecondPdf: async (_id: string | null) => {
    try {
      // const response = await fetch(
      //   `https://192.168.29.225:3335/api/pdf/pdf/weekly-pdf-admin/${_id}`
      // );

      // if (!response.ok) throw new Error('Failed to get data');

      // const data = await response.json();
      // return data;
      const response = await client.get(`pdf/weekly-pdf-admin/${_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default pdfService;
