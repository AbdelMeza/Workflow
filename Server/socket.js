import { Server } from "socket.io"

let io

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        // console.log("🟢 socket connected:", socket.id)
        
        socket.on("user:join", ({ userId }) => {
            console.log("joined room:", userId)
            socket.join(userId.toString())
        })

        socket.on("disconnect", () => {
            // console.log("🔴 socket disconnected:", socket.id)
        })
    })

}

export const getIO = () => io
