module.exports = function () {
    return async function (req, res) {
        req.logout();
        req.session.destroy((err) => {
            res.clearCookie('connect.sid');
            // Don't redirect, just print text
            res.send('Logged out');
        });
    }
}