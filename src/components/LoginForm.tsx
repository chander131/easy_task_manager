'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import {
	Box,
	Button,
	FormControl,
	Input,
	InputLabel,
	Typography,
} from '@mui/material';
import { useUser } from '@/app/context/UserContext';

export default function LoginForm() {
	const router = useRouter();
	const { setUser } = useUser();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const data = await login(username, password);
			const user = data.result;
			setUser?.(user);
			router.push('/');
		} catch (err) {
			console.error(err);
			setError('Usuario o contraseña incorrectos');
		}
	};

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box
				component='form'
				onSubmit={handleSubmit}
				sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
			>
				<Typography variant='h3'>Iniciar Sesión</Typography>
				<FormControl variant='standard'>
					<InputLabel htmlFor='username'>Username</InputLabel>
					<Input
						id='username'
						name='user'
						autoFocus
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
				</FormControl>
				<FormControl variant='standard'>
					<InputLabel htmlFor='password'>Password</InputLabel>
					<Input
						type='password'
						id='password'
						name='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</FormControl>
				<Button type='submit' variant='outlined'>
					Log in
				</Button>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</Box>
		</Box>
	);
}
