import { io } from "socket.io-client"

const URL = "http://localhost:3333"
const socket = io(URL, { autoConnect: false })

// socket.onAny((event, ...args) => {
//   // console.log(event, args)
// })

export default socket
