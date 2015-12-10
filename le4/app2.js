var eventproxy = require('eventproxy');
var superagent = require('superagent');
var async = require('async');

var cheerio= require('cheerio');

var url = require('url');

var cnodeUrl = 'http://cnodejs.org/';
superagent.get(cnodeUrl)
.end(function ( err, res ){
    if(err){
        return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function (idx, element){
        var $element = $(element)
        var href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
    });

    var ep = new eventproxy();
    var topic = 1;
    ep.after('info',topicUrls.length,function(list){
        topic = list.map(function(topicPair){
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);

            var subUrl = $('.user_info a').attr('href');
            var author = $('.user_info a').html();
            console.log('author: '+author);
            //if(author != NULL){
            //    var authorUrl
            //}
            return({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.replay_content').eq(0).text().trim(),
                author1: author
            });
        });
        console.log(topic);
    })
    async.eachLimit(topicUrls,5,function(thisUrl,callback){
        superagent.get(thisUrl)
        .end(function(err,sres){
            if(err){
                console.log("err order=")
            }else{
                //console.log("not err order="+order)
            }
            ep.emit('info', [thisUrl, res.text]);
            callback();
        })
    },function(err){
        console.log(err);
    })
})

//app.listen

