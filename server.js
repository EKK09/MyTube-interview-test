const express = require('express')
const app = express()
const port = process.env.PORT || 3000;


app.use(express.static('public'));
app.use('/favorite', express.static('public'));

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})