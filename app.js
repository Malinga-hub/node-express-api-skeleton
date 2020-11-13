/* require packages */
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

/* delaclare express app */
const app = express()
const router = express.Router()

/* connect to mongodb */
mongoose.connect("mongodb://localhost:27017/expressapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).catch((error) => console.log(error)) /* mongodb://localhost:27017/db_name */

mongoose.Promise = global.Promise /* set mongoose promise = default promise */

/* use packages */
app.use(morgan('dev')) /* log all server requests*/
app.use(bodyParser.urlencoded({extended: false})) /* parse application/x-www-form-urlencoded */
app.use(bodyParser.json()) /* parse application/json */

/* header middleware */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json; charset=UTF-8')
    next()
})

/* route middleware */
app.use(
router.get('/', (req,res,next)=>{
    res.status(200)
    res.json({
        "msg": "success",
        "code": "200",
        "data": null
    })
})
)

/* server error handle middleware */
app.use((req,res,next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

/* server error middleware */
app.use((error, req,res,next) => {
    res.status(error.status)
    res.json({
        error: {
            msg: error.message
        }
    })
})

/* export app */
module.exports = app