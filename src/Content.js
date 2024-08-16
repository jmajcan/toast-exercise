import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import FormSnackbar from './components/FormSnackbar';
import { fetchLikedFormSubmissions } from './service/mockServer';
import { useToast } from './contexts/ToastContext';

export default function Content() {
  const [ submissionList, setSubmissionList ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { hasSubmissionsChanged, setHasSubmissionsChanged } = useToast();

  useEffect(() => {
    if (hasSubmissionsChanged){
      setIsLoading(true);
      fetchLikedFormSubmissions()
        .then((value) => {
          console.log(value);
          setSubmissionList(value.formSubmissions);
          setHasSubmissionsChanged(false);
          setIsLoading(false);
        });
    }
  }, [hasSubmissionsChanged, setHasSubmissionsChanged, setSubmissionList]);

  const renderContent = () => {
    if (!isLoading && submissionList.length > 0) {
      return submissionList.map(({data}, index) => (
        <Typography key={index} variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
          {`${data.firstName} ${data.lastName}: ${data.email}`}
        </Typography>
      ));
    } else if (!isLoading && submissionList.length === 0) {
      return(
        <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
          No Submissions Currently
        </Typography>
      );
    } else {
      return;
    }
  }

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
        {isLoading ? (
          <Box sx={{marginTop: 2}}>
            <CircularProgress/>
          </Box>
        ) : null}
        <Box sx={{marginTop: 2}}>
          {renderContent()}
        </Box>
      <FormSnackbar />
    </Box>
  );
}
