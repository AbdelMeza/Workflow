import { create } from "zustand"

const searchManagement = create((set) => ({
    searchLoading: false,
    searchResult: {
        clients: null,
        services: null,
        global: null,
    },

    search: async ({ search, type }) => {
        const userToken = localStorage.getItem("userToken")

        try {
            set({ searchLoading: true })

            if (search === "") {
                set({ searchResult: { clients: null } })
                return
            }

            //search by search query and type (clients, services, global)
            const res = await fetch(`http://127.0.0.1:2005/user/search?search=${search}&type=${type}`, {
                method: "GET",
                headers: { token: userToken },
            })

            const data = await res.json()

            set({ searchLoading: false })
            set({ searchResult: { [type]: data } })
        } catch (error) {
            throw error
        }
    },
}))

export default searchManagement