module.exports =
    function(hours, minutes){
    let val=0;
    if(minutes>=30){
        val= 1;
    }
    return (hours * 2) + val
}