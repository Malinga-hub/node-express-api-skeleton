/* require packages */
const http = require('http')
const app = require('./app')

/* port */
const PORT = process.env.SERVER_PORT

/* create server */
const server = http.createServer(app)

/* listen to server port */
server.listen(PORT)