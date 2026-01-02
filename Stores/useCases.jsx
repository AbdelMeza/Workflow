import { create } from "zustand";

const useCases = create((set, get) => ({
    projectFormIsOpen: false,

    openProjectForm: () => set({ projectFormIsOpen: !get().projectFormIsOpen })
}))

export default useCases