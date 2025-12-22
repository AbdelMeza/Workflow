export async function getProducts(req, res) {
    try {
        const { username } = req.body

        if (!username) {
            return res.status(400).json({ error: "Username is required" })
        }

        const user = await userModel.findOne({ username: username })
        const { role } = user

    } catch (error) {
        console.log(error)
    }
}