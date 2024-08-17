import React from 'react'
import { useMediaQuery } from '@mui/material'
import Grid, { GridProps } from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import { useAtom } from 'jotai'
import { isCollapsedAtom } from '../../contexts/is-collapsed-atom'
import { getMarginLeft } from '../../utils/get-margin-left'


interface Props extends GridProps {
	children: React.ReactNode
}

const ViewContainer: React.FC<Props> = ({ children, ...attrs }) => {
	const [isCollapsed] = useAtom(isCollapsedAtom)
	const theme = useTheme()
	const isLargeScreen = useMediaQuery('(min-width: 1273px)')

	const marginLeft = getMarginLeft(isCollapsed, isLargeScreen, theme)

	return (
		<Grid
			columnSpacing={4}
			rowGap={2}
			paddingTop={theme.spacing(11)}
			paddingBottom={8}
			marginLeft={marginLeft}
			marginRight={theme.spacing(3)}
			component="main"
			{...attrs}
		>
			{children}
		</Grid>
	)
}

export default ViewContainer
