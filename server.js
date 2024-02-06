const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const authRouters = require('./routers/authRouters');
const profileRouters = require('./routers/userProfile');
const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouters)
app.use('/api/user-profile', profileRouters)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
