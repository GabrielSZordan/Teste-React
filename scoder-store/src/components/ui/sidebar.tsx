import React from 'react'
import { X } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Sidebar({ isOpen, onClose, children }: SidebarProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="sheet-overlay" onClick={onClose} />
      <div className="sheet-content">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </>
  )
}