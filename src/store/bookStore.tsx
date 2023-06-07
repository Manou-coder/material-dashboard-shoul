import { create } from 'zustand'

interface IBook {
  amount: number
  title: string
  updateAmount: (newAmount: number) => void
}

export const useBookStore = create<IBook>((set) => ({
  amount: 40,
  title: "Alice's Adventures in Wonderland",
  updateAmount: (newAmount: number) => set({ amount: newAmount }),
}))
