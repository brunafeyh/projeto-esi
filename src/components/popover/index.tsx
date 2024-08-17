import {
	ForwardRefRenderFunction,
	ReactNode,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { Popover as MuiPopover, PopoverProps, StackProps } from '@mui/material'
import { PopoverContainer } from './styles'

interface Props extends Omit<PopoverProps, 'open'> {
	children: ReactNode
	containerProps?: StackProps
}

export interface PopoverOptions {
	openPopover: (element: HTMLElement) => void
	closePopover: () => void
	isOpened: boolean
}

const PopoverComponent: ForwardRefRenderFunction<PopoverOptions, Props> = (
	{ children, containerProps, ...otherProps },
	ref
) => {
	const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

	const openPopover = useCallback((element: HTMLElement) => {
		setAnchorElement(element)
	}, [])

	const closePopover = useCallback(() => {
		setAnchorElement(null)
	}, [])

	const isOpened = !!anchorElement

	useImperativeHandle(ref, () => ({
		openPopover,
		closePopover,
		isOpened,
	}))

	return (
		<MuiPopover
			open={isOpened}
			anchorEl={anchorElement}
			onClose={closePopover}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			sx={{ mt: 1 }}
			{...otherProps}
		>
			<PopoverContainer {...containerProps}>{children}</PopoverContainer>
		</MuiPopover>
	)
}

export const usePopover = () => useRef<PopoverOptions>(null)

export const Popover = forwardRef(PopoverComponent)