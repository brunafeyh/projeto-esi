import { RefObject } from "react";
import { ModalOptions } from "../components/modal";

export const openModal = (ref: RefObject<ModalOptions>) => () => ref.current?.openModal();
export const closeModal = (ref: RefObject<ModalOptions>) => () => ref.current?.closeModal();