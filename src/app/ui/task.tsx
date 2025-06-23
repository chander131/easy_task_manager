'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import IconButton from '@mui/material/IconButton';

export interface ITask {
	id: string;
	title: string;
	description: string;
	status: string;
	created_at: string;
}

interface ITaskCardProps {
	task: ITask;
	setCurrentTask: Dispatch<SetStateAction<ITask | null>>;
	setEditing: Dispatch<SetStateAction<boolean>>;
	handleOpenModal: (task: ITask) => void;
	handleEdit: (task: ITask) => void;
}

const Task = (props: ITaskCardProps) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: props.task.id,
		data: props.task,
	});
	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<Card sx={{ width: '100%' }} ref={setNodeRef} style={style}>
			<CardHeader
				action={
					<>
						{props.task.status === 'T' && (
							<PendingActionsIcon sx={{ color: 'gray' }} />
						)}
						{props.task.status === 'I' && (
							<ManageHistoryIcon sx={{ color: 'gray' }} />
						)}
						{props.task.status === 'D' && (
							<CheckCircleOutlineIcon sx={{ color: 'gray' }} />
						)}
					</>
				}
				title={props.task.title}
				subheader={`created at ${new Date(
					props.task.created_at,
				).toLocaleDateString()}`}
			/>
			<CardContent>
				<Typography
					gutterBottom
					variant='body2'
					sx={{ color: 'text.secondary' }}
				>
					{props.task.description}
				</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: 'flex-end' }}>
				<Button onClick={() => props.handleOpenModal(props.task)}>
					<DeleteIcon />
				</Button>
				<Button
					onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
						event.stopPropagation();
						props.handleEdit(props.task);
					}}
				>
					<EditIcon />
				</Button>
				<IconButton {...listeners} {...attributes}>
					<DragIndicatorIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Task;
