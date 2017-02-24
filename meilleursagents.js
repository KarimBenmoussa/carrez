var cheerio = require('cheerio');
var fs      = require('fs');
var json_ma = { "type":"", "square_price":0,  "lower_price":0,  "middle_price":0,  "high_price":0 
};


var square_meter_price = function(json,request,callback){
  var url= 'https://www.meilleursagents.com/prix-immobilier/'+ json.city.toLowerCase() + '-'+json.zipCode;
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);                                                                         
      if(json_ma.type == "Appartement") {
                //lower price
                $('div.medium-uncollapse:nth-child(2) > div:nth-child(2)').filter(function(){
                   var data            = $(this);
                   var price           = data.text().trim();
                   json_ma.lower_price = parseInt(price);   
                })
                
                //middle price
                $('div.medium-uncollapse:nth-child(2) > div:nth-child(3)').filter(function(){
                   var data             = $(this);
                   var price            = data.text().trim();
                   json_ma.middle_price = parseInt(price);   
                })

                //high price
                $('div.medium-uncollapse:nth-child(2) > div:nth-child(4)').filter(function(){
                    var data           = $(this);
                    var price          = data.text().trim();
                    json_ma.high_price = parseInt(price);    
                })
            }
       else if(json_ma.type == "Maison") {
                //lower price
                $('div.medium-uncollapse:nth-child(3) > div:nth-child(2)').filter(function(){
                     var data            = $(this);
                     var price           = data.text().trim();
                     json_ma.lower_price = parseInt(price);                    
                })

                //middle price
                $('div.medium-uncollapse:nth-child(3) > div:nth-child(3)').filter(function(){
                     var data             = $(this);
                     var price            = data.text().trim();
                     json_ma.middle_price = parseInt(price);   
                })

                //high price
                $('div.medium-uncollapse:nth-child(3) > div:nth-child(4)').filter(function(){
                     var data           = $(this);
                     var price          = data.text().trim();
                     json_ma.high_price = parseInt(price);         
                })
            }
          
        fs.writeFile('meilleursagents.json', JSON.stringify(json_ma, null, 4), function(err){
    console.log('File successfully written! - Check your project directory for the output.json file');   

}); 
      
    json_ma.square_price = json.prix / json.surface ;    
    return (json_ma.square_price <= json_ma.middle_price) ? json_ma.type="Good deal" :  json_ma.type="Bad deal";
      callback && callback(json_ma);

  }


});
}

exports.square_meter_price = square_meter_price;
