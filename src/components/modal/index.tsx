import {
	ForwardRefRenderFunction,
	ReactNode,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'

import { Box, ModalProps, Modal as MuiModal } from '@mui/material'

interface Props extends Omit<ModalProps, 'children' | 'open'> {
	children: ReactNode
}

export interface ModalOptions {
	openModal: () => void
	closeModal: () => void
}

const ModalComponent: ForwardRefRenderFunction<ModalOptions, Props> = ({ children, ...otherProps }, ref) => {
	const [isOpened, setIsOpened] = useState<boolean>(false)

	const openModal = useCallback(() => {
		setIsOpened(true)
	}, [])

	const closeModal = useCallback(() => {
		setIsOpened(false)
	}, [])

	useImperativeHandle(ref, () => ({
		openModal,
		closeModal,
	}))

	return (
		<MuiModal open={isOpened} onClose={closeModal} {...otherProps}>
			<Box display="flex" justifyContent="center" alignItems="center" height="100vh">
				{children}
			</Box>
		</MuiModal>
	)
}

export const useModal = () => useRef<ModalOptions>(null)

export const Modal = forwardRef(ModalComponent)
