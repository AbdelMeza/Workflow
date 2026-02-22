import { create } from "zustand"

const searchManagement = create((set) => ({
    searchLoading: false,
    searchResult: {
        clients: null,
        services: null,
    },

    searchClient: async (search) => {
        const userToken = localStorage.getItem("userToken")

        try {
            if (search === "") {
                set({ searchResult: { clients: null } })
                return
            }

            set({ searchLoading: true })
            const res = await fetch(`http://127.0.0.1:2005/user/search?search=${search}`, {
                method: "GET",
                headers: { token: userToken },
            })

            const data = await res.json()

            set({ searchLoading: false })
            set({ searchResult: { clients: data } })
        } catch (error) {
            console.log(error)
        } finally {
            set({ searchLoading: false })
        }
    },

    searchService: async (search) => {
        const userToken = localStorage.getItem("userToken")
        try {
            if (search === "") {
                set({ searchResult: { services: null } })
                return
            }
            set({ searchLoading: true })
            const res = await fetch(`http://127.0.0.1:2005/data/search_services?search=${search}`, {
                method: "GET",
                headers: { token: userToken },
            })

            const data = await res.json()

            set({ searchLoading: false })
            set({ searchResult: { services: data } })
        } catch (error) {
            console.log(error)
        } finally {
            set({ searchLoading: false })
        }
    }
}))

export default searchManagement