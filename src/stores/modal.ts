import { create } from 'zustand'

interface ModalItem {
  id: string
  component: React.ComponentType<any>
  props: Record<string, any>
}

interface ModalStore {
  modals: ModalItem[]
  openModal: (
    component: React.ComponentType<any>,
    props?: Record<string, any>
  ) => string
  closeModal: (id: string) => void
  closeLast: () => void
  closeAll: () => void
}

const BASE_Z_INDEX = 1000

const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2)

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],
  openModal: (component, props = {}) => {
    const id = generateId()
    const zIndex = BASE_Z_INDEX + get().modals.length
    set((state) => ({
      modals: [...state.modals, { id, component, props: { ...props, zIndex } }],
    }))
    return id
  },
  closeModal: (id) =>
    set((state) => ({ modals: state.modals.filter((m) => m.id !== id) })),
  closeLast: () => set((state) => ({ modals: state.modals.slice(0, -1) })),
  closeAll: () => set({ modals: [] }),
}))
