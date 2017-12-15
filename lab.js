const express = require('express')
const app = express()

//app.get('/', (req, res) => res.send('root'))
//TODO redirect to static
app.get('/', (req, res) => res.send('/static/index.html'))

app.use('/static', express.static('public'))

//nodecube api @ref nodenodenode
var appModule=require('nodenodenode')().appModule;
app.get('/nodecube', (req, res) => appModule.handleHttp(req,res))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
