require('dotenv').config()
const express = require ('express')
const cors = require('cors')

const { databaseConection } = require('./database/config')

const app = express()
app.use(cors())
databaseConection()
app.use(express.json())

app.use('/api/auth/', require('./routers/auth'))
app.use('/api/events/', require('./routers/events'))

app.listen(process.env.PORT, () => {
    console.log(`LISTEN ${process.env.PORT}`);
})
