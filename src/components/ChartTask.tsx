'use client';

import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const ChartTask = (props: { summary: Record<string, number> }) => {
	const data: { title: string; total: number }[] = Object.entries(
		props.summary,
	).reduce((acc, curr) => {
		acc.push({ title: curr[0], total: curr[1] });

		return acc;
	}, [] as { title: string; total: number }[]);

	const renderLineChart = (
		<PieChart width={400} height={300}>
			<Pie
				data={data}
				dataKey='total'
				nameKey='title'
				cx='50%'
				cy='50%'
				outerRadius={80}
				label
			>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index]} />
				))}
			</Pie>
			<Tooltip />
			<Legend />
		</PieChart>
	);

	return (
		<Paper elevation={3} sx={{ padding: 4 }}>
			<Typography variant='h6' gutterBottom>
				Distribución de Tareas por Estado
			</Typography>
			<Box sx={{ width: '100%', height: 300 }}>
				<ResponsiveContainer>{renderLineChart}</ResponsiveContainer>
			</Box>
		</Paper>
	);
};

export default ChartTask;
