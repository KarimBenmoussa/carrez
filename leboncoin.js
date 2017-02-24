 
var request = require('request');
var cheerio = require('cheerio');
var fs      = require('fs');

var price, city, type_of_property, includes_agency_fees, room, surface, ghg, energy_label, reference, description, zipCode;
var json = { price : "", city : "", type_of_property : "" , room : "", surface : "", ghg : "", energy_label : "", includes_agency_fees : "",reference : "", description : "", zipCode : ""};

var read_Lbc = function(url,request,callback){
	request(url, function(error, response, html){

        if(!error){
            var $ = cheerio.load(html);         

            //price
            $('#adview > section > section > section > div:nth-child(5) > h2 > span.value').filter(function(){
					var data   = $(this);               
					price      = data.text().trim();
					json.price = parseInt(price);               
            })

            //city
            $('#adview > section > section > section.properties.lineNegative > div.line.line_city > h2 > span.value').filter(function(){
					var data     = $(this);              
					city         = data.text().replace(new RegExp("[^a-zA-Z\-]", "g"), '');
					zipCode      = data.text().replace(/[^0-9]+/ig,"");
					json.city    = city;
					json.zipCode = zipCode;               
            })

            
             //type_of_property
            $('#adview > section > section > section > div:nth-child(8) > h2 > span.value').filter(function(){
					var data              = $(this);              
					type_of_property      = data.text().trim();
					json.type_of_property = type_of_property;               
            })

             //includes_agency_fees
            $('#adview > section > section > section > div.line.line_city > h2 > span.value').filter(function(){
					var data             = $(this);              
					includes_agency_fees = data.text().trim();
               // json.includes_agency_fees = includes_agency_fees;               
            })

             //room
            $('#adview > section > section > section > div.line.line_city > h2 > span.value').filter(function(){
					var data = $(this);              
					room     = data.text().trim();
                //json.room = room;               
            })

             //surface
            $('#adview > section > section > section > div:nth-child(10) > h2 > span.value').filter(function(){
					var data     = $(this);              
					surface      = data.text().trim();
					json.surface = parseInt(surface);               
            })

             //ghg
            $('#adview > section > section > section > div:nth-child(10) > h2 > span.value').filter(function(){
					var data = $(this);              
					ghg      = data.text().trim();
					json.ghg = ghg;               
            })

             //energy_label
            $('#adview > section > section > section > div:nth-child(10) > h2 > span.value').filter(function(){
					var data          = $(this);              
					energy_label      = data.text().trim();
					json.energy_label = energy_label;               
            })

             //reference
            $('#adview > section > section > section > div:nth-child(9) > h2 > span.value').filter(function(){
					var data       = $(this);              
					reference      = data.text().trim();
					json.reference = reference;               
            })

             //description
            $('#adview > section > section > section > div.line.properties_description > p.value').filter(function(){
					var data         = $(this);              
					description      = data.text().trim();
					json.description = description;               
            })
            


        }


         

        fs.writeFile('leboncoin.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');   

});
        callback(json);
});
}
exports.read_Lbc = read_Lbc;