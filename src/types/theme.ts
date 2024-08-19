import React from 'react'
export type FontWeight = 'bold' | 'regular' | 'medium' | 'light' | 'extralight'

export interface Font {
	[k: string]: `
	@font-face {
		font-family: ${string};
		font-style: normal;
		font-display: swap;
		font-weight: ${number};
		src: local(${string}), local(${string}), url(${string}) format(${string});
		unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
	}
`
}

export interface JuicyColors {
	p10?: React.CSSProperties['color']
	p20?: React.CSSProperties['color']
	p30?: React.CSSProperties['color']
	p40?: React.CSSProperties['color']
	p50?: React.CSSProperties['color']
	p60?: React.CSSProperties['color']
	p70?: React.CSSProperties['color']
	p80?: React.CSSProperties['color']
	p90?: React.CSSProperties['color']
	p100?: React.CSSProperties['color']
	p110?: React.CSSProperties['color']
}

declare module '@mui/material/styles/createPalette' {
	interface Palette {
		unioeste: {
			primary: JuicyColors
			secondary: JuicyColors
			neutral: JuicyColors
			success: JuicyColors
			error: JuicyColors
			warning: JuicyColors
		}
	}
	interface PaletteOptions {
		unioeste: {
			primary: JuicyColors
			secondary: JuicyColors
			neutral: JuicyColors
			success: JuicyColors
			error: JuicyColors
			warning: JuicyColors
		}
	}
}
