module.exports = {
    ensureAuthenticated: function(req, res, next,) {
        if (req.isAuthenticated()) {
            console.log("authenticate User: "+req.user)
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/olimpia/login');
    },
    ensureAuthorizedAdmin: function(req, res, next) {
        if (req.user.isAdmin) {
            console.log("authenticate Admin: "+req.user)
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect(403,'/error');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        if (!req.user.isAdmin) {
            console.log("2"+req.user.isAdmin);
        }else{
            console.log("3"+req.user.isAdmin);
        }
    }

};
