import { useRef } from 'react'
import { ModalHandlers } from '../types/modal-handlers'

const useModal = () => useRef<ModalHandlers>(null)

export default useModal
