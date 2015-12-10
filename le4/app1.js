//work now, but not limit.
var event = require('events')
var eventEmitter = new event.EventEmitter();

var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'http://cnodejs.org/';

superagent.get(cnodeUrl)
.end(function(err,res){
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

    var num = 0;
    var list = [];
    eventEmitter.on('info',function(data,order){
        num++;
        list[order] = data;
        //console.log("num = " +num);
        if(num == topicUrls.length){
            //console.log("length = " + list.length);
            for(var i = 0; i < list.length; i ++){
                items[i].user = list[i].user
                items[i].text = list[i].text
                items[i].score = list[i].score
                console.log(items[i]);
            }
            //todo
        }
    });

    for( var i = 0; i < topicUrls.length;i++){
        (function(){
            var order = i;
            superagent.get(topicUrls[i])
            .end(function(err,sres){
                //console.log(ufs);
                var $$ = cheerio.load(sres.text);
                var userUrl = $$('#reply1 .author_content a').attr('href');
                var ls = {
                    user: "None",
                    text: "None",
                    score: "None"
                }
                if(userUrl){
                    //console.log(userUrl);
                    ls = {
                        user: $$('#reply1 .user_info .dark').text(),
                        text: $$('#reply1 .reply_content .markdown-text').text()
                    };
                    (function(){
                        var temp = ls;
                        userUrl= url.resolve(cnodeUrl, userUrl);
                        superagent.get(userUrl).end(function(err,sres){
                            var $$$ = cheerio.load(sres.text);
                            var score = $$$('.user_profile').find('span').eq(0).text();
                            //console.log(score);
                            //console.log(temp.user);
                            temp.score=score;
                        })

                    })()
                }
                eventEmitter.emit('info',ls,order);
            })
        })()
    }
})

