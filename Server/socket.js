import { Server } from "socket.io"

let io

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        socket.on("user:join", ({ userId }) => {
            console.log("joined room:", userId)
            socket.join(userId.toString())
        })
    })

}

export const getIO = () => io
