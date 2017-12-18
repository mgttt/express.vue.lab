const express=require('express');
const express_app = express();

//POST => nodenodenode
var appModule=require('nodenodenode')().appModule;
appModule.express = express;//hook the express
appModule.express_app = express_app;
express_app.post('/', (req, res) => appModule.handleHttp(req,res))

// root => default.html
express_app.get('/', (req, res) => res.redirect('/default.html'))

// other to static docs/
express_app.use('/', express.static('docs'))

var port=3000;//TODO hook the argo.express_port and argo.express_host later...
express_app.listen(port, () => console.log(`listening on port ${port}!`))
