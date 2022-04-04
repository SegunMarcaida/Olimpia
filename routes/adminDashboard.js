const express = require('express');
const router = express.Router();
const Field = require('../models/field').Field;
const url = 'mongodb+srv://segundo:olimpia@cluster0.rutme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MongoClient = require('mongodb').MongoClient;
router.get('/addfield', (req, res) => {
        res.send('addfield')

})
//findReserves
router.get('/mycourts',(req,res)=>{
    let admin = req.body.admin;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db();
        let query = {admin: admin};
        dbo.collection("fields").find(query).toArray(function(err, result) {
            if (err) throw err;
            res.send(result);

            db.close();
        });
    });
})

// add Field    
router.post('/addfield',(req,res)=>{
    const {name, sport,location,description, amount,price,admin} = req.body;
   Field.findOne({name:name}).then(field=>{
        if (field){
            res.redirect('back');
        }else{  let newField = new Field({name,sport,location,description,amount,price,admin})
            newField.save();
            res.redirect('back');
        }
    })
})
module.exports = router;