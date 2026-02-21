import { create } from "zustand";

const useCases = create((set, get) => ({
    projectFormIsOpen: false,
    affiliateClientIsOpen: false,
    searchResult: null,
    loadingState: false,
    searchLoading: false,
    selectedClient: null,

    selectClient: (client) => set({ selectedClient: client }),
    toggleProjectForm: () => set({ projectFormIsOpen: !get().projectFormIsOpen }),
    toggleAffiliateClient: () => set({ affiliateClientIsOpen: !get().affiliateClientIsOpen, searchResult: null }),

    searchClient: async (search) => {
        const userToken = localStorage.getItem("userToken")

        try {
            if (search === "") {
                set({ searchResult: null })
                return
            }

            set({ searchLoading: true })
            const res = await fetch(`http://127.0.0.1:2005/user/search?search=${search}`, {
                method: "GET",
                headers: { token: userToken },
            })

            const data = await res.json()

            set({ searchLoading: false })
            set({ searchResult: data })
        } catch (error) {
            console.log(error)
        } finally {
            set({ loadingState: false })
        }
    },

    affiliateClient: async ({ projectId, userId }) => {
        const values = {
            projectTargeted: projectId,
            userId,
            clientId: get().selectedClient.id
        }

        const userToken = localStorage.getItem("userToken")

        try {
            if (!values) return

            set({ loadingState: true })

            await fetch("http://127.0.0.1:2005/user/affiliate", {
                method: "POST",
                headers: {
                    token: userToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })

            set({ loadingState: false })
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useCases