const express = require('express')
const app = express()

//POST => nodenodenode
var appModule=require('nodenodenode')().appModule;
app.post('/', (req, res) => appModule.handleHttp(req,res))

// redirect / => index.html
app.get('/', (req, res) => res.redirect('/index.html'))

// other to static
app.use('/', express.static('.'))

// license to port (TODO argo later)
var port=3000;
app.listen(port, () => console.log(`listening on port ${port}!`))
