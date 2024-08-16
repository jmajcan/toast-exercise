import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { useToast } from '../contexts/ToastContext';
import { saveLikedFormSubmission } from '../service/mockServer';


const FormSnackbar = () => {
	const { open, setOpen, submission, setHasSubmissionsChanged } = useToast();
	const [ openErrorAlert, setOpenErrorAlert ] = useState(false);
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');

	useEffect(() => {
		if (submission.data) {
			setName(submission.data.firstName + ' ' + submission.data.lastName);
			setEmail(submission.data.email);
		}
	}, [submission])

	const handleLike = () => {
		try{
			saveLikedFormSubmission(submission)
				.then((value) => {
					console.log(value);
					setOpen(false);
					setHasSubmissionsChanged(true);
					setOpenErrorAlert(false)
				})
				.catch((err) => {
					console.log(`ERROR ${err.status}: ${err.message}`);
					setOpenErrorAlert(true)
				});
		} catch(err) {
			console.log(`ERROR: ${err}`);
		}
	};

	const action = (
		<>
			<Button color="inherit" size="small" onClick={handleLike}>
				LIKE
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={() => setOpen(false)}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<div>
			<Snackbar
				open={openErrorAlert}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				onClose={() => setOpenErrorAlert(false)}
			>
				<Alert
					onClose={() => setOpenErrorAlert(false)}
					severity="error"
					variant="filled"
				>
					There was an error trying to save please try again.
				</Alert>
			</Snackbar>
			<Snackbar
				open={open}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				onClose={() => setOpen(false)}
				message={
				<>
					<Typography variant="body2">{name}</Typography>
					<Typography variant="body2">{email}</Typography>
				</>
				}
				action={action}
			/>
		</div>
	);
}

export default FormSnackbar;
