var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
//调用node核心模块url
var url = require('url');

var cnodeUrl = 'https://cnodejs.org';

superagent.get(cnodeUrl)
.end(function(err, res) {
    if(err) {
        console.log(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    $('#topic_list .topic_title').each(function(index, element) {
        href = url.resolve(cnodeUrl, $(this).attr('href'));
        topicUrls.push(href);
    });

    var ep = new eventproxy();
    ep.after('topic_html', topicUrls.length, function(topics) {
        topics = topics.map(function(topicPair) {
            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);

            var subUrl = $('.user_info a').attr('href');
            var author = $('.user_info a').html();
            console.log('author: ' + author);
            if(author !== null) {
                var authorUrl = url.resolve(cnodeUrl, subUrl);
            }
            /*
               var score = 0;
               superagent.get(authorUrl)
               .end(function(err, res) {
               if(err) {
               console.log(err);
               }
               var $$ = cheerio.load(res.text);
               score = $$('.user_profile span').html();
               console.log(score);
               });
               */
            return({
                title: $('.topic_full_title').text().trim(),
                href: topicUrl,
                comment1: $('.reply_content').eq(0).text().trim(),
                author1: author
                /*score1: score*/
            });

        });


        console.log('final: ');
        console.log(topics);
    });

    //增加async.eachLimit()方法，控制并发数量
    async.eachLimit(topicUrls, 5, function(topicUrl, callback) {
        superagent.get(topicUrl)
        .end(function(err, res) {
            //console.log('fetch ' + topicUrl + ' successful');
            console.log(res.status);
            ep.emit('topic_html', [topicUrl, res.text]);
            callback();
        });
    }, function(err) {
        console.log(err);
    });
});
