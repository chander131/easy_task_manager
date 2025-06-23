'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	cssVariables: true,
	palette: {
		primary: {
			main: '#3F51B5', // Un azul clásico y versátil (Indigo 500)
			light: '#7986CB', // Indigo 300
			dark: '#303F9F', // Indigo 700
			contrastText: '#FFFFFF', // Blanco para texto sobre primary
		},
		secondary: {
			main: '#FFC107', // Un amarillo cálido para acentos (Amber 500)
			light: '#FFECB3', // Amber 100
			dark: '#FFA000', // Amber 700
			contrastText: '#212121', // Gris oscuro para texto sobre secondary
		},
		error: {
			main: '#D32F2F', // Rojo estándar para errores
			light: '#EF5350',
			dark: '#C62828',
			contrastText: '#FFFFFF',
		},
		warning: {
			main: '#FF9800', // Naranja para advertencias
			light: '#FFB74D',
			dark: '#F57C00',
			contrastText: '#FFFFFF',
		},
		info: {
			main: '#2196F3', // Azul claro para información
			light: '#64B5F6',
			dark: '#1976D2',
			contrastText: '#FFFFFF',
		},
		success: {
			main: '#4CAF50', // Verde para éxito
			light: '#81C784',
			dark: '#388E3C',
			contrastText: '#FFFFFF',
		},
		background: {
			default: '#F5F5F5', // Gris muy claro para el fondo principal (Grey 100)
			paper: '#FFFFFF', // Blanco para los componentes "paper" (cards, dialogs)
		},
		text: {
			primary: '#212121', // Gris oscuro casi negro para texto principal (Grey 900)
			secondary: '#757575', // Gris medio para texto secundario (Grey 600)
			disabled: '#BDBDBD', // Gris claro para texto deshabilitado (Grey 400)
		},
	},

	// --- Tipografía ---
	typography: {
		// La fuente principal para el cuerpo del texto
		fontFamily: 'var(--font-roboto), sans-serif', // Roboto como fuente principal

		// Configuración para los diferentes niveles de encabezado
		h1: {
			fontFamily: 'var(--font-montserrat), sans-serif',
			fontSize: '3.5rem', // Puedes ajustar el tamaño según tus necesidades
			fontWeight: 800, // Extra bold
			lineHeight: 1.2,
			color: 'var(--mui-palette-text-primary)', // Usar el color de texto del tema
		},
		h2: {
			fontFamily: 'var(--font-montserrat), sans-serif',
			fontSize: '2.8rem',
			fontWeight: 700, // Bold
			lineHeight: 1.25,
			color: 'var(--mui-palette-text-primary)',
		},
		h3: {
			fontFamily: 'var(--font-montserrat), sans-serif',
			fontSize: '2.2rem',
			fontWeight: 700,
			lineHeight: 1.3,
			color: 'var(--mui-palette-text-primary)',
		},
		h4: {
			fontFamily: 'var(--font-open-sans), sans-serif',
			fontSize: '1.8rem',
			fontWeight: 600, // Semi-bold
			lineHeight: 1.35,
			color: 'var(--mui-palette-text-primary)',
		},
		h5: {
			fontFamily: 'var(--font-open-sans), sans-serif',
			fontSize: '1.5rem',
			fontWeight: 600,
			lineHeight: 1.4,
			color: 'var(--mui-palette-text-primary)',
		},
		h6: {
			fontFamily: 'var(--font-open-sans), sans-serif',
			fontSize: '1.2rem',
			fontWeight: 700,
			lineHeight: 1.5,
			color: 'var(--mui-palette-text-primary)',
		},
		// Para elementos de texto como párrafos, botones, etc.
		body1: {
			fontFamily: 'var(--font-roboto), sans-serif',
			fontSize: '1rem',
			fontWeight: 400, // Regular
			lineHeight: 1.6,
			color: 'var(--mui-palette-text-primary)',
		},
		body2: {
			fontFamily: 'var(--font-roboto), sans-serif',
			fontSize: '0.875rem', // 14px
			fontWeight: 400,
			lineHeight: 1.5,
			color: 'var(--mui-palette-text-secondary)',
		},
		button: {
			fontFamily: 'var(--font-open-sans), sans-serif',
			fontSize: '0.9rem',
			fontWeight: 700, // Bold para botones
			textTransform: 'uppercase', // Opcional, Material-UI lo hace por defecto
			color: 'var(--mui-palette-text-primary)',
		},
		caption: {
			fontFamily: 'var(--font-roboto), sans-serif',
			fontSize: '0.75rem', // 12px
			fontWeight: 400,
			lineHeight: 1.66,
			color: 'var(--mui-palette-text-secondary)',
		},
		overline: {
			fontFamily: 'var(--font-roboto), sans-serif',
			fontSize: '0.75rem',
			fontWeight: 500, // Medium
			lineHeight: 2.66,
			textTransform: 'uppercase',
			color: 'var(--mui-palette-text-secondary)',
		},
	},

	// --- Opcional: Configuración de Componentes (ej. botones, cards) ---
	// Puedes anular estilos específicos de componentes aquí
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8, // Bordes un poco más redondeados para los botones
				},
				containedPrimary: {
					// Puedes ajustar el color de fondo o texto para estados específicos
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12, // Bordes más redondeados para las tarjetas
					boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Sombra sutil
				},
			},
		},
		// Añade más componentes según necesites personalizar
	},

	// --- Opcional: Breakpoints personalizados ---
	// Si necesitas ajustar los puntos de quiebre responsivos
	// breakpoints: {
	// 	values: {
	// 		xs: 0,
	// 		sm: 600,
	// 		md: 960,
	// 		lg: 1280,
	// 		xl: 1920,
	// 	},
	// },
});

export default theme;
