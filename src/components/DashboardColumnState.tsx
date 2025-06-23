'use client';

import Task, { ITask } from '@/app/ui/task';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction } from 'react';
import { useDroppable } from '@dnd-kit/core';
import Chip from '@mui/material/Chip';

interface IDashboardColumnState {
	title: string;
	tasks: ITask[];
	setCurrentTask: Dispatch<SetStateAction<ITask | null>>;
	setEditing: Dispatch<SetStateAction<boolean>>;
	handleOpenModal: (task: ITask) => void;
	handleEdit: (task: ITask) => void;
}

const DashboardColumnState = (props: IDashboardColumnState) => {
	const { setNodeRef } = useDroppable({
		id: props.title,
	});

	return (
		<Grid
			spacing={1}
			container
			size={{ xs: 12, sm: 4 }}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'whitesmoke',
				p: 1,
				borderRadius: 3,
				minWidth: { xs: '100%', sm: 'initial' },
			}}
			ref={setNodeRef}
		>
			<Grid size={12} display='flex' alignItems='center'>
				<Typography variant='body1' component='span' sx={{ mr: 1 }}>
					{props.title}
				</Typography>
				<Chip label={props.tasks.length} size='small' />
			</Grid>
			<Grid container size={12}>
				{props.tasks.map((task: ITask) => (
					<Task
						key={task.id}
						task={task}
						setCurrentTask={props.setCurrentTask}
						setEditing={props.setEditing}
						handleOpenModal={props.handleOpenModal}
						handleEdit={props.handleEdit}
					/>
				))}
			</Grid>
		</Grid>
	);
};

export default DashboardColumnState;
