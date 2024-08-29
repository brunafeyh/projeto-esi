import { createTheme } from '@mui/material/styles';

import { UNIOESTE_COLORS } from './colors'
import { FONT_WEIGHTS, fonts } from './fonts'
import { IBM_PLEX_SANS_FONT_FAMILY } from '../utils/constants/values'

export const theme = createTheme({
	palette: {
		unioeste: { ...UNIOESTE_COLORS },
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 416,
			md: 912,
			lg: 1280,
			xl: 1280,
		},
	},
	typography: {
		fontFamily: [IBM_PLEX_SANS_FONT_FAMILY, IBM_PLEX_SANS_FONT_FAMILY].join(','),
		h3: undefined,
		h4: undefined,
		h5: undefined,
		h6: undefined,
		subtitle1: undefined,
		subtitle2: undefined,
		allVariants: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			color: UNIOESTE_COLORS.primary.p100,
			fontSize: '1rem',
		},
		h1: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			fontSize: '2rem',
			'@media screen and (max-width: 416px)': {
				fontSize: '1.5rem',
			},
		},
		h2: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			fontSize: '1.5rem',
			'@media screen and (max-width: 416px)': {
				fontSize: 16,
			},
		},
		button: {
			fontFamily: IBM_PLEX_SANS_FONT_FAMILY,
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
		body1: {
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
		body2: {
			'@media screen and (max-width: 416px)': {
				fontSize: '0.875rem',
			},
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: Object.values(fonts).join('\n'),
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'initial',
					fontSize: '12px',
					fontWeight: FONT_WEIGHTS.medium,
					padding: '8px 16px',
					color: `${UNIOESTE_COLORS.primary.p10}`,
					backgroundColor: `${UNIOESTE_COLORS.error.p50}`,
					transition: 'all .2s',
					borderRadius: 0,
					border: 'none',
					boxShadow: '4px 4px 4px rbga(0, 0, 0, 0.2) !important',
					height: '32px',
					'& svg': {
						width: '1.5rem',

						height: '1.5rem',
					},
					'&:hover': {
						backgroundColor: '#FFB79A',
				},
				},
			},
			variants: [
				{
					props: { disabled: true },
					style: {
						background: 'none',
						opacity: '.5',
						color: `${UNIOESTE_COLORS.primary.p60} !important`,
						'& :is(p, span, strong, svg)': {
							fill: UNIOESTE_COLORS.error.p50,
						},
						
					},
				},
				{
					props: { variant: 'outlined' },
					style: {
						color: `${UNIOESTE_COLORS.neutral.p100}`,
						backgroundColor: 'transparent',
						border: `1px solid ${UNIOESTE_COLORS.neutral.p50}`,
						'&:hover': {
							backgroundColor: `${UNIOESTE_COLORS.neutral.p40}`,
							border: `1px solid ${UNIOESTE_COLORS.neutral.p50}`,
						},
					},
				},

				{
					props: { variant: 'text' },
					style: {
						color: `${UNIOESTE_COLORS.primary.p60}`,
						backgroundColor: 'transparent',
						'&:hover': {
							backgroundColor: `${UNIOESTE_COLORS.error.p10}`,
						},
					},
				},
			],
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					width: '100%',
					color: UNIOESTE_COLORS.primary?.p100,

					'& label': {
						color: UNIOESTE_COLORS.primary?.p100,
						'&.MuiFormLabel-filled': {
							color: UNIOESTE_COLORS.primary.p100,
						},
						'&.Mui-error': {
							color: UNIOESTE_COLORS.error.p50,
						},
					},
					'& .MuiInputLabel-root': {
						fontSize: 14,
					},
					'&:hover label': {
						color: UNIOESTE_COLORS.primary?.p100,

						'&.Mui-error': {
							color: UNIOESTE_COLORS.error.p50,
						},
					},
					'& label.Mui-focused': { color: UNIOESTE_COLORS.primary.p60 },
					'& .MuiOutlinedInput-root': {
						width: '100%',

						'&:hover fieldset': {
							border: `solid 1px ${UNIOESTE_COLORS.primary.p100}`,
						},
						'&.Mui-focused fieldset': {
							border: `solid 1px ${UNIOESTE_COLORS.primary?.p60}`,
						},

						'&.Mui-error': {
							'& fieldset': {
								border: `1px solid ${UNIOESTE_COLORS.error.p50} !important`,
							},
						},
					},
					'& .MuiFormHelperText-root': {
						color: `${UNIOESTE_COLORS.error.p50} !important`,
						marginLeft: 0,
					},
				},
			},
		},

		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 4,
				},
			},
			variants: [
				{
					props: { disabled: true },
					style: {
						background: 'none',
						opacity: '.5',
						color: `${UNIOESTE_COLORS.neutral.p60} !important`,
						'& :is(p, span, strong, svg)': {
							fill: UNIOESTE_COLORS.neutral.p60,
						},
					},
				},
			],
		},
		MuiSnackbar: {
			styleOverrides: {
				root: {
					width: '100%',
					color: '#FFF',
					'& svg': {
						color: '#FFF',
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					'&.Mui-selected': {
						backgroundColor: UNIOESTE_COLORS.neutral.p40,
						color: UNIOESTE_COLORS.neutral.p100,
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderColor: UNIOESTE_COLORS.neutral.p60,
					},
				},
				input: {
					padding: '10px 14px',
				},
				notchedOutline: {
					borderColor: UNIOESTE_COLORS.neutral.p50,
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					'&.Mui-selected': {
						backgroundColor: UNIOESTE_COLORS.neutral.p40,
						color: UNIOESTE_COLORS.neutral.p100,
					},
					'&.Mui-selected:hover': {
						backgroundColor: UNIOESTE_COLORS.neutral.p30,
					},
				},
			},
		},
	},
})
