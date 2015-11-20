function pet(words){
    this.speak=function(){
        console.log(this.words)
        console.log(this)
    }
    this.words=words
    console.log(this.words)
    console.log(this)
}

pet(123)
console.log("===1==")
var cat= new pet("miao")
console.log("===2==")
cat.speak()

