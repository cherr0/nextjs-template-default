import { useModalStore } from '@/stores/modal'

export const useModal = () => {
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)
  const closeLast = useModalStore((state) => state.closeLast)
  const closeAll = useModalStore((state) => state.closeAll)

  return { openModal, closeModal, closeLast, closeAll }
}