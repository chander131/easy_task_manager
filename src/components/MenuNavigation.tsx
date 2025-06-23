'use client';

import Box from '@mui/material/Box';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '@/lib/auth';
import { useUser } from '@/app/context/UserContext';

const pages = [
	{ title: 'Dashboard', link: '/dashboard' },
	{ title: 'Monitor', link: '/monitor' },
];

const MenuNavigation = () => {
	const router = useRouter();
	const { user, setUser } = useUser();
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const navigateTo = (pageUrl: string) => {
		router.push(pageUrl);
	};

	const handleLogout = async () => {
		try {
			await logout();
			setUser?.(null);
			navigateTo('/login');
		} catch (error) {
			console.error('Error cerrando sesión:', error);
		}
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Box sx={{ display: 'flex', width: '80%', alignItems: 'center' }}>
						<Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
							<Image
								src={'/logo_icon.png'}
								width={30}
								height={30}
								alt='logo_easy_task_manager'
							/>
						</Box>

						{user && (
							<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
								<IconButton
									size='large'
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleOpenNavMenu}
									color='inherit'
								>
									<MenuIcon />
								</IconButton>
								<Menu
									id='menu-appbar'
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{ display: { xs: 'block', md: 'none' } }}
								>
									{pages.map(page => (
										<MenuItem
											key={page.title}
											onClick={() => {
												navigateTo(page.link);
												handleCloseNavMenu();
											}}
										>
											<Typography key={page.title} sx={{ textAlign: 'center' }}>
												{page.title}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						)}

						<Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
							<Image
								src={'/logo_icon.png'}
								width={30}
								height={30}
								alt='logo_easy_task_manager'
							/>
						</Box>

						{user && (
							<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
								{pages.map(page => (
									<Button
										key={page.link}
										sx={{ my: 2, color: 'white', display: 'block' }}
										onClick={() => navigateTo(page.link)}
									>
										{page.title}
									</Button>
								))}
							</Box>
						)}
					</Box>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							width: '20%',
						}}
					>
						<Typography>{user && <>Bienvenido, {user.username}</>}</Typography>

						{user && (
							<IconButton
								onClick={handleLogout}
								sx={{ color: 'primary.contrastText' }}
							>
								<LogoutIcon />
							</IconButton>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default MenuNavigation;
