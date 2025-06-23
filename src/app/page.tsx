import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function Home() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: '90vh',
			}}
		>
			<Box sx={{ mt: 2, display: { xs: 'block', sm: 'none', md: 'none' } }}>
				<Image
					src={'/logo.png'}
					width={400}
					height={400}
					alt='logo_app_easy_task_manager'
				/>
			</Box>
			<Box sx={{ mt: 2, display: { xs: 'none', sm: 'block', md: 'none' } }}>
				<Image
					src={'/logo.png'}
					width={700}
					height={700}
					alt='logo_app_easy_task_manager'
				/>
			</Box>
			<Box
				sx={{
					zIndex: -1,
					mt: -25,
					display: { xs: 'none', sm: 'none', md: 'block' },
				}}
			>
				<Image
					src={'/logo.png'}
					width={800}
					height={800}
					alt='logo_app_easy_task_manager'
				/>
			</Box>
			<Typography>Power by Daniel Elias</Typography>
		</Box>
	);
}
