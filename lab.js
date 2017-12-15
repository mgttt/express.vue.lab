const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('root'))

//nodecube api @ref nodenodenode
var appModule=require('nodenodenode')().appModule;
app.get('/nodecube', (req, res) => appModule.handleHttp(req,res))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
