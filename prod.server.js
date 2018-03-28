var express = require('express')
var config = require('./config/index')
var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('/', function (req, res, next) {
	req.url = '/index.html'
	next()
})
var apiData=require('./data.json')
var goods=apiData.goods
var seller=apiData.seller
var ratings=apiData.ratings
var apiRoutes=express.Router()
apiRoutes.get('/goods',function(req,res){
  res.json({
      errno:0,
      data:goods
  })
})
apiRoutes.get('/ratings',function(req,res){
  res.json({
      errno:0,
      data:ratings
  })
})
apiRoutes.get('/seller',function(req,res){
  res.json({
      errno:0,
      data:seller
  })
})
app.use('/api',apiRoutes)
app.use(router)

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});
