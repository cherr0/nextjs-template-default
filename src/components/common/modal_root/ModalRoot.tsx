'use client'

import React from 'react'

import { useModalStore } from '@/stores/modal'

export const ModalRoot = () => {
  const modals = useModalStore((state) => state.modals)
  const closeModal = useModalStore((state) => state.closeModal)

  return (
    <>
      {modals.map(({ id, component: Component, props }) => {
        const wrappedProps = { ...props }

        if (typeof wrappedProps.onSubmit === 'function') {
          const originalOnSubmit = wrappedProps.onSubmit
          wrappedProps.onSubmit = async (...args: any[]) => {
            await originalOnSubmit(...args)
            closeModal(id)
          }
        }

        if (typeof wrappedProps.onOpenChange === 'function') {
          const originalOnOpenChange = wrappedProps.onOpenChange
          wrappedProps.onOpenChange = (open: boolean) => {
            try {
              originalOnOpenChange?.(open)
            } finally {
              if (!open) closeModal(id)
            }
          }
        }

        return (
          <Component
            key={id}
            {...wrappedProps}
            open
            onOpenChange={
              wrappedProps.onOpenChange ??
              ((open: boolean) => {
                if (!open) closeModal(id)
              })
            }
          />
        )
      })}
    </>
  )
}
