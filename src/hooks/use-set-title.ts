import { useLayoutEffect, useRef } from 'react'

export const useSetTitle = (title: string) => {
	const documentDefined = typeof document !== 'undefined'
	const originalTitle = useRef(documentDefined ? document.title : null)

	useLayoutEffect(() => {
		if (!documentDefined) return

		if (document.title !== title) document.title = `${title}`

		return () => {
			document.title = String(originalTitle.current)
		}
	}, [title])
}
