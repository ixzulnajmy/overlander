import { create } from 'zustand'

export const useUI = create<{ sidebarOpen: boolean; setOpen: (v:boolean)=>void }>((set) => ({
  sidebarOpen: true,
  setOpen: (sidebarOpen) => set({ sidebarOpen })
}))
