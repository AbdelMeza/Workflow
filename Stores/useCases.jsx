import { create } from "zustand";

const useCases = create((set, get) => ({
    projectFormIsOpen: false,
    affiliateClientIsOpen: false,
    searchResult: null,

    toggleProjectForm: () => set({ projectFormIsOpen: !get().projectFormIsOpen }),
    toggleAffiliateClient: () => set({ affiliateClientIsOpen: !get().affiliateClientIsOpen, searchResult: null }),

    searchClient: async (search) => {
        const userToken = localStorage.getItem("userToken")

        try {
            if (search === "") {
                set({ searchResult: null })
                return
            }

            const res = await fetch(`http://127.0.0.1:2005/user/search?search=${search}`, {
                method: "GET",
                headers: { token: userToken },
            })

            const data = await res.json()


            set({ searchResult: data })
        } catch (error) {
            console.log(error)
        }
    },

    affiliateClient: async (values) => {
        const userToken = localStorage.getItem("userToken")

        try {
            if (!values) return

            await fetch("http://127.0.0.1:2005/user/affiliate", {
                method: "POST",
                headers: {
                    token: userToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useCases