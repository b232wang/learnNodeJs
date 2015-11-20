var EventEmitter = require('events').EventEmitter
var life= new EventEmitter()
life.setMaxListeners(11)
life.on('bla',function(res){
    console.log(res)
})
life.on('bla',function(res){
    console.log(res+"123")
})
life.removeAllListeners('bla')
life.emit('bla','hello csc')

