var http = require('http')
var querystring = require('querystring')
var postData = querystring.stringify({
    'content': 'test again try',
    'video_id':'qpgTC9MDx1o',
    'bgr':'!f3xCUZeF8oQOtWJE0qryHTis8AQCAAAAYVIAAAAKKgEv6boI9zc3Z_qQSz_QhkrUOdXoOfaYdIIDlhw0Y3YpFM-1ZV6sHR5vpNxS4itOwmr59i_7YLz3HedXKuXCiEZQHvuKo18l3IJ1jW2I6ACBLZwKLEHQnuslZc2G98W_5KaYjlmhPjNSq-g4Pak9jK-DHMdrhmnfpD12RjLkB40cuinz7YMstjAfE_-AdZe7Kn6bSs90z_68iGZu8ZAJFNyqjD8jsvSXY_jS4sxKfAVdTBcM0PvubIBA6lVmpFbqRGnPChrh7h-vM5rcEwqbzKvxdGlDc9St5kD3HzFsc_kGNnPMQwvfm2n7uC1om55xUjQ1IUly9Q_Tc92oOE1MdOjF4UxG5k0YbrKkIh6Ka4l1D-63mx4ZduElmWvi8Z7ga9IxOP4HKlVqi0i52PnX9704',
    'smpl':'true',
    'session_token':'QUFFLUhqblFUTmpnUnBHQ1hhWXNTZ3FnLTRnMDVvenFXZ3xBQ3Jtc0tsSWFPUmJKc3FnR0c5OG04NlZnU0ZaaEEweV9FZUZTRjVSMHZvTlAxX2ZZY29jWFlPY053WXVfUHRxUzdWREdqS0VlX3hFUDhWckQ1TUNRVFh5UGRkX3dabjFTWVl4VkdTdzFfYWpOeElkRjRWRm13MU5hcVktQVhZOEJjVUFGY3lQUFNQRjVTMU9aQ0NVY1FEOVREZ2htckRlQ3c='
})

var options = {
    hostname: 'www.youtube.com',
    port:80,
    path:'/watch?v=qpgTC9MDx1o&list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMqpgTC9MDx1o',
    methed:'POST',
    headers:{
        'accept':'*/*',
        'accept-encoding':'gzip, deflate',
        'accept-language':'en-CA,en;q=0.8,zh-CN;q=0.6,zh;q=0.4',
        'content-length':postData.length,
        'content-type':'application/x-www-form-urlencoded',
        'cookie':'SID=DQAAAHUBAACtIIY4v2Hv3cAR-o79TZ73b07t2LQfxq-wLpfMsfQJuO_XDJieN2_OV3euvm2bOxLzEb-4J4cpJ5VF1WDvK5VOnCuy2EVXbz9AaS3w3eajeH-VLiupCoy1wn-NJeEPL4vsaoHhxD7MRTT4QGql_LaiYSaMy3c4RYscIggVYeVMoATdt29yTCFU2nPZ5J70fZOL0s0bMcLIAQU7xqFnqOS0dCT262BQEgENLa-EFMU_TFngM8LSzt4jJ1oEbBXnYPvToHjQp5HXjNYaAOGK5YxAiIcabiEmub90LKrz_lSwo6Sx9JmZ5gifP_YSvfWvsCUB9IgNd8VEOs487Rhq8udIA1hgPXDk5WG1gpSSZgkPABi79Ia1ujsb5b0tVVV-he-79WgQv6VFnZ_Z0qB3kI3im6fFif-MnKP4r1V61t2YVAORs6TvGUdcEXUeWo49ISQ8o0D42RMB_bYOm2XdPNN3xXl5B5M2usC71CHEIlYQL_ugnn2Ub9Ovt1SPKjDJQvk; HSID=AboMF_mLKzl7ZCbXh; SSID=AukZckXu3_wmLt4SX; APISID=0JG0AunZSpdL1yKG/AiWrfP9zmt9IoNn84; SAPISID=vlX6xygIEUNFdSzk/Ah_Lr5tusCXAKscDw; LOGIN_INFO=b175430c7dddbc690d705ac3c8adb5dac2sAAAB7IjQiOiAiR0FJQSIsICI3IjogMTQxMjgxMjMzMiwgIjEiOiAxLCAiMiI6ICI2UW5sd1N0a1pDeG9Zc1NuS0pRdjZ3PT0iLCAiMyI6IDE3ODU3NDk0MzEsICI4IjogMzI4NzA5NzcxMjk2fQ==; __utma=27069237.717977164.1414695438.1414695438.1417820418.2; VISITOR_INFO1_LIVE=QnkpxvSr2G4; YSC=ILn06FQpcB4; PREF=f1=50000000&al=en&f5=30&f4=4000000&fv=16.0.0',
        'origin':'https://www.youtube.com',
        'referer':'https://www.youtube.com/watch?v=qpgTC9MDx1o&list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVMqpgTC9MDx1o',
        'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36',
        'x-client-data':'CIS2yQEIpbbJAQiptskBCMS2yQEI74jKAQi2lcoB',
        'x-youtube-page-cl':'102683834',
        'x-youtube-page-label':'youtube_20150909_RC2',
        'x-youtube-variants-checksum':'aa91d6d1fe740a0e008dd5adf4881592'
    }
}
var req = http.request(options,function(res){
    console.log("Status: "+ res.statusCode)
    console.log("headers: "+ JSON.stringify(res.headers))
    res.on('data',function(chunk){
        console.log(Buffer.isBuffer(chunk))
        console.log(typeof chunk)
    })
    res.on('end',function(){
        console.log("complete")
    })
})

req.on('error',function(e){
    console.log("Error : "+e.message)
})
req.write(postData)
req.end()
