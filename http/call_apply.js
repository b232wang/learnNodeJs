function pet(words){
    this.words=words
    this.speak=function(){
        console.log(this.words)
    }
}
//pet.speak('speak')

function dog(words){
    //words:'~~',
    pet.call(this,words)
    //pet.apply(this,arguments)
}
var p = new dog('~~')
p.speak()
