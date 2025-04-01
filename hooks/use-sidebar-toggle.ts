"use client"

import { create } from "zustand"

interface SidebarState {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

export const useSidebarToggle = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))

