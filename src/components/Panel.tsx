'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DashboardColumnState from '@/components/DashboardColumnState';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';

import { ITask } from '@/app/ui/task';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormAddTask from './FormAddTask';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

interface IPanelProps {
	tasks: ITask[];
}

export const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: { xs: '70%', md: 400 },
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	minHeight: 100,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
};

const DictionaryTitleStatus: { [key: string]: string } = {
	'TO-DO': 'T',
	'IN-PROGRESS': 'I',
	DONE: 'D',
};

const Panel = ({ tasks }: IPanelProps) => {
	const TODO_TASKS: ITask[] = tasks.filter(t => t.status === 'T');
	const INPROGRESS_TASKS: ITask[] = tasks.filter(t => t.status === 'I');
	const DONE_TASKS: ITask[] = tasks.filter(t => t.status === 'D');
	const COLUMNS = [
		{ title: 'TO-DO', tasks: TODO_TASKS },
		{ title: 'IN-PROGRESS', tasks: INPROGRESS_TASKS },
		{ title: 'DONE', tasks: DONE_TASKS },
	];

	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [editing, setEditing] = useState(false);
	const [currentTask, setCurrentTask] = useState<ITask | null>(null);
	const [editingTask, setEditingTask] = useState<{
		title: string;
		description: string;
	}>({ title: '', description: '' });

	const handleOpenModal = (task: ITask) => {
		setCurrentTask(task);
		setOpen(true);
	};

	const handleEdit = (task: ITask) => {
		setCurrentTask(task);
		setEditingTask({ title: task.title, description: task.description });
		setOpen(false);
		setEditing(true);
	};

	const handleClose = () => {
		setCurrentTask(null);
		setOpen(false);
		setEditing(false);
	};

	const handleDelete = async () => {
		if (!currentTask?.id) return;

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_TASK_MANAGER_API}/api/tasks/${currentTask?.id}/`,
			{
				method: 'DELETE',
				credentials: 'include',
			},
		);

		if (res.status === 204) {
			handleClose();
			router.refresh();
		}
	};

	const handleUpdate = async () => {
		if (!currentTask?.id) return;

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_TASK_MANAGER_API}/api/tasks/${currentTask?.id}/partial/`,
			{
				method: 'PATCH',
				body: JSON.stringify(editingTask),
				headers: { 'content-type': 'application/json' },
				credentials: 'include',
			},
		);

		if (res.status === 200) {
			handleClose();
			setEditingTask({ title: '', description: '' });
			router.refresh();
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEditingTask({
			...editingTask,
			[event.target.name]: event.target.value,
		});
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		if (
			over &&
			active.data.current?.status === DictionaryTitleStatus[over.id as string]
		) {
			return;
		}

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_TASK_MANAGER_API}/api/tasks/${active.id}/partial/`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					status: DictionaryTitleStatus[over?.id as string],
				}),
				headers: { 'content-type': 'application/json' },
				credentials: 'include',
			},
		);

		if (res.status === 200) {
			router.refresh();
		}
	};

	return (
		<>
			<Box
				sx={{
					flexGrow: 1,
					p: 1,
					marginLeft: { lg: 'auto' },
					marginRight: { lg: 'auto' },
					maxWidth: { lg: '1200px' },
				}}
			>
				<FormAddTask />
				<DndContext onDragEnd={handleDragEnd}>
					<Grid
						container
						spacing={2}
						sx={{
							flexWrap: { xs: 'nowrap', sm: 'wrap' },
							overflowX: { xs: 'auto', sm: 'hidden' },
							minWidth: { xs: '100vw', sm: 'initial' },
						}}
					>
						{COLUMNS.map((column, i) => (
							<DashboardColumnState
								key={i}
								title={column.title}
								tasks={column.tasks}
								setCurrentTask={setCurrentTask}
								setEditing={setEditing}
								handleOpenModal={handleOpenModal}
								handleEdit={handleEdit}
							/>
						))}
					</Grid>
				</DndContext>
			</Box>
			<Modal
				open={open && !editing}
				onClose={handleClose}
				aria-labelledby='title-modal-delete-task'
				aria-describedby='modal-modal-description'
			>
				<Box sx={modalStyle}>
					<Typography id='title-modal-delete-task' variant='h6' component='h2'>
						¿Estas seguro de eliminar la tarea {currentTask?.title}?
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'flex-end',
						}}
					>
						<Button onClick={handleClose}>No</Button>
						<Button onClick={handleDelete}>Si</Button>
					</Box>
				</Box>
			</Modal>
			<Modal
				open={editing && !open}
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
								value={editingTask['title']}
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
								value={editingTask['description']}
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
						<Button onClick={handleUpdate}>Guardar</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default Panel;
