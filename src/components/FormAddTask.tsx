'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { modalStyle } from './Panel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { useRouter } from 'next/navigation';

const FormAddTask = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [task, setTask] = useState<{ title: string; description: string }>({
		title: '',
		description: '',
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTask({
			...task,
			[event.target.name]: event.target.value,
		});
	};

	const handleCreate = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_TASK_MANAGER_API}/api/tasks/`,
			{
				method: 'POST',
				body: JSON.stringify(task),
				headers: { 'content-type': 'application/json' },
				credentials: 'include',
			},
		);

		// const data = await res.json();

		if (res.status === 201) {
			handleClose();
			setTask({ title: '', description: '' });
			router.refresh();
		}
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
			<Button variant='outlined' onClick={handleOpen}>
				Crear tarea
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='title-modal-edit-task'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalStyle}>
					<Box
						component='form'
						sx={{ '& > :not(style)': { m: 1 } }}
						noValidate
						autoComplete='off'
						display='flex'
						flexDirection='column'
					>
						<FormControl variant='standard'>
							<InputLabel htmlFor='task-title'>Title</InputLabel>
							<Input
								id='task-title'
								name='title'
								autoFocus
								value={task['title']}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl variant='standard'>
							<InputLabel htmlFor='task-description'>Description</InputLabel>
							<Input
								id='task-description'
								name='description'
								multiline
								rows={4}
								value={task['description']}
								onChange={handleChange}
							/>
						</FormControl>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'flex-end',
						}}
					>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button onClick={handleCreate}>Crear</Button>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};

export default FormAddTask;
