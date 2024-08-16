import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormSnackbar from './components/FormSnackbar';
import { useToast } from './contexts/ToastContext';

export default function Content() {
  const { submissions } = useToast();

  return (
    <Box sx={{marginTop: 3}}>
      <Typography variant="h4">Liked Form Submissions</Typography>

      {submissions.map((submission) => {
        return (
          <Typography variant="body1" sx={{fontStyle: 'italic', marginTop: 1}}>
            {submission.name} - {submission.email}
          </Typography>
        );
      })}
      <FormSnackbar />
    </Box>
  );
}
