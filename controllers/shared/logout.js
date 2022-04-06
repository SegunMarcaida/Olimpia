module.exports = function (){
    return async function (req, res) {
        req.logout();
        res.send('200',{msg:'logged out'});
    }
}