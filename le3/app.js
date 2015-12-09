var express = require("express");
var superagent = require("superagent");
var cheerio = require("cheerio");


var app = express();
app.get("/",function(req,res,next){
    superagent.get("https://cnodejs.org/")
    .end(function(err,sres){
        if(err){
            return next(err);
        }
        var $ = cheerio.load(sres.text);
        var items=[];
        $('#topic_list ').find('.topic_title').each(
            function(idx, element){
                var $element = $(element);
                var href = $element.attr('href');
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href'),
                    author: $element.parents('.cell').find('img').attr('title')
                });
                //superagent.get("https://cnodejs.org"+href)
                //.end(function(err,ssres){
                //    var $$ = cheerio.load(ssres.text);
                //    //theAuthor= $$('#content').find('.changes').eq(1).text();
                //    var theAuthor= $$('#content .changes span').eq(1).find('a').text();
                //    items[idx].author = theAuthor;
                //    console.log(idx+" -> "+theAuthor);
                //})
            });
            res.send(items);
            //superagent.get("https://cnodejs.org/topic/565c4473d0bc14ae279399fe")
            //.end(function(err,uu){
            //    var uufs = cheerio.load(uu.text);
            //    var pp = uufs('#content .changes span').eq(1).find('a').text();
            //    console.log(" -> "+pp);
            //})
    });
})

app.listen(3000, function(){
    console.log("listen 3000");
})
