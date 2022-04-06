const User = require("../../models/User");
const bcrypt = require("bcryptjs");
 module.exports = function(){
     return async function (req, res) {
         const {name, email, password, password2, phone, isAdmin} = req.body;
         let errors = [];

         if (!name || !email || !password || !password2) {
             errors.push({msg: 'Please enter all fields'});
         }

         if (password != password2) {
             errors.push({msg: 'Passwords do not match'});
         }

         if (password.length < 6) {
             errors.push({msg: 'Password must be at least 6 characters'});
         }

         if (errors.length > 0) {
             res.render('adminRegister', {
                 errors,
                 name,
                 email,
                 password,
                 password2,
                 phone,
                 isAdmin
             });
         } else {
             User.findOne({email: email}).then(admin => {
                 console.log(admin)
                 if (admin) {
                     errors.push({msg: 'Email already exists'});
                     res.render('adminRegister', {
                         errors,
                         name,
                         email,
                         password,
                         password2,
                         phone,
                         isAdmin
                     });
                 } else {
                     const newClient = new User({
                         name,
                         email,
                         password,
                         phone,
                         isAdmin
                     });

                     bcrypt.genSalt(10, (err, salt) => {
                         bcrypt.hash(newClient.password, salt, (err, hash) => {
                             if (err) throw err;
                             newClient.password = hash;
                             newClient
                                 .save()
                                 .then(admin => {
                                     req.flash(
                                         'You are now registered and can log in'
                                     );
                                     res.redirect('/olimpia/login');
                                 })
                                 .catch(err => console.log(err));
                         });
                     });
                 }
             });
         }
     }
}