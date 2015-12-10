//work now
var eventproxy = require('eventproxy');
var cheerio= require('cheerio');
var superagent = require('superagent');
var async = require('async');

var url = require('url');

var cnodeUrl = 'http://cnodejs.org/';
superagent.get(cnodeUrl)
.end(function ( err, res ){
    if(err){
        return console.error(err);
    }
    var topicUrls = [];
    var items = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function (idx, element){
        var $element = $(element)
        var href = url.resolve(cnodeUrl, $element.attr('href'));
        items.push({
            title: $element.attr('title'),
            herf: $element.attr('href')
        })
        topicUrls.push(href);
    });

    var ep = new eventproxy();
    ep.after('info',topicUrls.length,function(list){
        console.log("length="+list.length);
        for(var i = 0; i < list.length; i ++){
            items[list[i].order].user = list[i].user
            items[list[i].order].text= list[i].text
            //console.log(items[i]);
        }
        console.log(items);
    })
    var i = 0;
    async.eachLimit(topicUrls,5,function(thisUrl,callback){
        var order = i;
        i++;
        superagent.get(thisUrl)
        .end(function(err,res){
            console.log(res.status)
            if(err){
                console.log("err order="+order)
            }else{
                console.log("not err order="+order)
            }
            var $$ = cheerio.load(res.text);
            var ls = {
                user: $$('#reply1 .user_info .dark').text(),
                text: $$('#reply1 .reply_content .markdown-text').text(),
                order: order
            }
            ep.emit('info',ls)
            callback();
        });
    },function(err){
         console.log(err);
    })
})

//app.listen

