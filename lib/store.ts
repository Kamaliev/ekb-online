import { create } from "zustand";

type AuthMode = "login" | "signup";

interface AuthModalState {
  open: boolean;
  mode: AuthMode;
  openModal: (mode?: AuthMode) => void;
  closeModal: () => void;
  setMode: (mode: AuthMode) => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
  open: false,
  mode: "login",
  openModal: (mode = "login") => set({ open: true, mode }),
  closeModal: () => set({ open: false }),
  setMode: (mode) => set({ mode }),
}));
