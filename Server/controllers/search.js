export async function searchSysteme(req, res) {
    try {
        const search = req.query.search
        const type = req.query.type

        const searchResult = type === "clients" ?
            await searchClient(search) : type === "global" ?
                await globalSearch(search) : null

        res.status(200).json(searchResult)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

async function globalSearch(search) {
    const regex = new RegExp('^' + search, 'i')

    let results = []

    try {
        const projects = await projectsModel.find({ title: { $regex: regex } })
        results.push(...projects.map(p => ({ source: 'projects', data: p })))

        const clients = await userModel.find({ username: { $regex: regex } })
        results.push(...clients.map(c => ({ source: 'clients', data: c })))

        const tasks = await tasksModel.find({ title: { $regex: regex } })
        results.push(...tasks.map(t => ({ source: 'tasks', data: t })))

        return results
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

async function searchClient(search) {
    const searchResult = []
    const regex = new RegExp('^' + search, 'i')
    try {
        const users = await userModel.find({
            $and: [
                { role: "client" },
                {
                    $or: [
                        { username: { $regex: regex } },
                        { email: { $regex: regex } }
                    ]
                }
            ]
        }).select("_id username email")

        if (!users || users.length === 0) {
            return { error: "No results found" }
        }

        searchResult.push(...users)

        return searchResult
    } catch (error) {
        console.log(error)
        return { error: "Server error, try again" }
    }
}