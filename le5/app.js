var urls = [];
for(var i = 0; i< 30;i++){
    urls.push("http://datasource"+i);
}

var num = 0;
var fetchUrl = function(url, callback){
    var delay = parseInt((Math.random() * 1000), 10);
    num ++;
    console.log('send number '+num +", and catch the " + url +" take "+delay +"ss");
    setTimeout(function(){
        num--;
        callback(null, url + ' html content');
    }, delay);
};

var async = require('async');
async.mapLimit(urls, 5, function (url,callback){
    fetchUrl(url,callback);
}, function(err, result){
    console.log('final:');
    console.log(result);
})
