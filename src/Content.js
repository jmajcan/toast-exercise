import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormSnackbar from './components/FormSnackbar';
import { fetchLikedFormSubmissions } from './service/mockServer';
import { useToast } from './contexts/ToastContext';

export default function Content() {
  const [ submissionList, setSubmissionList ] = useState([]);
  const { hasSubmissionsChanged, setHasSubmissionsChanged } = useToast();

  useEffect(() => {
    if (hasSubmissionsChanged){
      fetchLikedFormSubmissions().then((value) => setSubmissionList(value.formSubmissions));
      setHasSubmissionsChanged(false);
    }
  }, [hasSubmissionsChanged, setHasSubmissionsChanged, setSubmissionList]);

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
        {submissionList.length > 0 ? submissionList.map(({data}) => {
            return (
              <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
                {`${data.firstName} ${data.lastName}: ${data.email}`}
              </Typography>
            );
        }) : (
          <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>No Submissions Currently</Typography>
        )}
      <FormSnackbar />
    </Box>
  );
}
