var globalVariable = "This is a global variable"
function globalFunction(){
    var localVariable= "This is a local variable"
    console.log("visit global/local variable")
    console.log(globalVariable)
    console.log(localVariable)
}
globalFunction()
