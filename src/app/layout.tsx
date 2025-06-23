import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto, Open_Sans, Montserrat } from 'next/font/google';
import MenuNavigation from '@/components/MenuNavigation';
import { UserProvider } from './context/UserContext';
import ThemeRegistry from './ThemeRegistry';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-roboto',
});

const openSans = Open_Sans({
	weight: ['400', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-open-sans',
});

const montserrat = Montserrat({
	weight: ['500', '700', '800'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-montserrat',
});

export const metadata = {
	title: 'My Easy Task Manager',
	description: 'App protegida',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html
			lang='en'
			className={`${roboto.variable} ${openSans.variable} ${montserrat.variable}`}
		>
			<body>
				<AppRouterCacheProvider>
					<ThemeRegistry>
						<UserProvider>
							<MenuNavigation />
							<main>{children}</main>
						</UserProvider>
					</ThemeRegistry>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
};

export default RootLayout;
