export interface ModalHandlers {
	openModal: () => void
	closeModal: () => void
}

export interface PopoverHandlers {
	isOpened: boolean
	id?: string
	anchorElement?: HTMLElement | null
	openPopover: (event: React.MouseEvent<HTMLElement>) => void
	closePopover: () => void
}
