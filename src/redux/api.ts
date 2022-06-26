import axios from 'axios';

const preUrl = 'https://fflwavahzaiymkoreoau.supabase.co/rest/v1';
const AuthToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbHdhdmFoemFpeW1rb3Jlb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU4MzU3NzgsImV4cCI6MTk3MTQxMTc3OH0.iAR-zA0_260RznjV1VS9r5_IKjxKtu3KTANIoo-Sj9o';
const apiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbHdhdmFoemFpeW1rb3Jlb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU4MzU3NzgsImV4cCI6MTk3MTQxMTc3OH0.iAR-zA0_260RznjV1VS9r5_IKjxKtu3KTANIoo-Sj9o';

export default {
  fetchAuthGet: (url: string) =>
    axios.get(`${preUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
        apiKey: apiKey,
      },
    }),
};
