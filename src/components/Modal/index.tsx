'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPrimitive,
} from '@/components/UI/dialog'
import { X } from 'lucide-react'
import { ReactNode } from 'react'

interface ModalProps {
  title: string
  trigger: ReactNode
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export function Modal({
  title,
  trigger,
  children,
  isOpen,
  onClose,
}: ModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent className="lg:max-w-4xl sm:max-w-lg w-full mx-auto max-h-[600px] my-5 overflow-auto">
        <DialogPrimitive.Close
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500 dark:ring-offset-gray-950 dark:focus:ring-gray-800 dark:data-[state=open]:bg-gray-800 dark:data-[state=open]:text-gray-400"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription asChild>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
