import { MouseEvent, RefObject } from 'react'
import { PopoverOptions } from '../components/popover'

export const openPopover = (ref: RefObject<PopoverOptions>) => (event: MouseEvent<HTMLElement>) =>
	ref.current?.openPopover(event.currentTarget)

export const closePopover = (ref: RefObject<PopoverOptions>) => () => ref.current?.closePopover()
