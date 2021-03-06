const User = require("../../models/User").User;
const bcrypt = require("bcryptjs");
 module.exports = function(){
     return async function (req, res) {
         const {username, email, password, password2, phone, isAdmin,id} = req.body;
         let errors = [];

         if (!username || !email || !password || !password2) {
             errors.push({msg: 'Please enter all fields'});
         }

         if (password != password2) {
             errors.push({msg: 'Passwords do not match'});
         }

         if (password.length < 6) {
             errors.push({msg: 'Password must be at least 6 characters'});
         }

         if (errors.length > 0) {
             res.send(400,{success: false,msg: 'there are some errors',
                 errors});
         } else {
          await User.findOne({email: email}).then(async admin => {
              console.log(admin)
              if (admin) {
                  res.send(418, {success: false,msg: 'email already in use'});
              } else {
                  const newClient = new User({
                      username,
                      email,
                      password,
                      phone,
                      isAdmin,
                      id
                  });

                  await bcrypt.genSalt(10, async (err, salt) => {
                      await bcrypt.hash(newClient.password, salt, (err, hash) => {
                          if (err) throw err;
                          newClient.password = hash;
                          newClient
                              .save()
                              .then(admin => {
                                  res.send(201, {success: true,msg: 'user saved'})
                              })
                              .catch(err => console.log(err));
                      });
                  });
              }
          });
         }
     }
}