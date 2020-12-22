const express = require('express')
const cors = require('cors')
const routes = require('./src/routes/routes')
const BASE_PATH = '/api/v1'
const app = express()
const port = 3000

app.use(cors())
app.use(`${BASE_PATH}/`,routes)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})