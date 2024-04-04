require('dotenv').config()

const express = require('express')
const app = express ()
const mongoose  = require('mongoose')
const cors = require('cors')

app.use(cors())

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to DB!'))

app.use(express.json())

const userDataRouter = require('./routes/userData')
app.use('/userdatas', userDataRouter)

const inventoryRouter = require('./routes/inventory')
app.use('/items', inventoryRouter)

const taskRouter = require('./routes/tasks')
app.use('/tasks', taskRouter)


app.listen(3000, () => console.log('Server is up!'))

/*
require('dotenv').config()

const express = require('express')
const {connectToDB , getDb} = require('./db')


const app = express ()
//const mongoose  = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json())

let db
connectToDB((err) => {
    if(!err) {
        app.listen(3000, () => console.log('Server is up!'))
        db = getDb()
    }
})




const userDataRouter = require('./routes/userData')
app.use('/userdatas', userDataRouter)

const inventoryRouter = require('./routes/inventory')
app.use('/items', inventoryRouter)

const taskRouter = require('./routes/tasks')
app.use('/tasks', taskRouter)

*/