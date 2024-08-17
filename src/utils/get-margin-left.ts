import { Theme } from '@mui/material'

export const getMarginLeft = (isCollapsed: boolean, isLargeScreen: boolean, theme: Theme) => {
	const sidebarWidthCollapsed = theme.spacing(13)
	const sidebarWidthExpanded = theme.spacing(29)

	const marginLeft = isCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded

	if (isLargeScreen && !isCollapsed) {
		return `calc(${marginLeft} + ${theme.spacing(3)})`
	}

	return marginLeft
}
