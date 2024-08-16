import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import FormSnackbar from './components/FormSnackbar';
import { fetchLikedFormSubmissions } from './service/mockServer';
import { useToast } from './contexts/ToastContext';

export default function Content() {
  const [ submissionList, setSubmissionList ] = useState([]);

  const [ isError, setIsError] = useState(false);

  const { hasSubmissionsChanged, setHasSubmissionsChanged } = useToast();

  useEffect(() => {
    if (hasSubmissionsChanged){
      fetchLikedFormSubmissions()
        .then((value) => {
          setHasSubmissionsChanged(false);
          setIsError(false);
          setSubmissionList(value.formSubmissions);
        })
        .catch((err) => {
          console.log(`ERROR ${err.status}: ${err.message}`);
          setHasSubmissionsChanged(false);
          setIsError(true);
        });
    }
  }, [hasSubmissionsChanged, setHasSubmissionsChanged, setSubmissionList]);

  const renderContent = () => {
    if (isError) {
      return (
        <Box display="flex" sx={{flexDirection: 'row'}}>
          <Typography variant="body1" sx={{fontWeight: 'bold', marginTop: 1, color: 'red'}}>
          An error occured please try again.
          </Typography>
          <Button variant="contained" color="error" sx={{ marginLeft: 8 }} onClick={() => {
            setHasSubmissionsChanged(true);
            setIsError(false);
          }}>
            Try Again
          </Button>
        </Box>
      );
    }
  
    if (!hasSubmissionsChanged && submissionList.length > 0) {
      return submissionList.map(({data}, index) => (
        <Typography key={index} variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
          {`${data.firstName} ${data.lastName}: ${data.email}`}
        </Typography>
      ));
    } else if (!hasSubmissionsChanged && submissionList.length === 0) {
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
    <Box sx={{marginTop: 3, justifyContent: 'center'}}>
      <Typography variant="h4">Liked Form Submissions</Typography>
        {hasSubmissionsChanged ? (
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
