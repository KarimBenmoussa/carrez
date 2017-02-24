//require express
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var leboncoin      = require('./leboncoin');
var meilleuragents = require('./meilleursagents');
var app            = express();

//create our route object
var router = express.Router();

//export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {	 
	res.render('pages/index'),{type:'',square:'',low:'',hight:'',mean:''};
});

router.post('/', function(req, res){
  var url = req.body.url;
  leboncoin.read_Lbc(url,request,function(data){
    meilleuragents.square_meter_price(data,request,function(json_ma){
      console.log(json_ma);
      res.render(path.join(__dirname + '/public/index.ejs'), {type: json_ma.type,square:json_ma.square_price,low:json_ma.lower_price,hight:json_ma.high_price,mean:json_ma.middle_price});
    });
    
  });
});