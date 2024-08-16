import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import { useToast } from '../contexts/ToastContext';


const FormSnackbar = () => {
	const { open, setOpen, submission } = useToast();
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');

	useEffect(() => {
		if (submission.data) {
			setName(submission.data.firstName + ' ' + submission.data.lastName);
			setEmail(submission.data.email);
		}
	}, [submission])

	const handleLike = () => {
		console.log('submission', submission);
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
