
module.exports = function (){
 return
}
 module.exports = function (milisec){
let hoursInMilisec = parseInt(milisec/MILISECONDS_IN_A_DAY);
return parseInt(hoursInMilisec/MILISECONDS_IN_A_HOUR)
}