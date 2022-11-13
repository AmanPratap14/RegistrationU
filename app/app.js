var express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const connection = require('./connection');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static(__dirname+'/public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/')
    },
    filename: function (req, file, cb) {
      cb(null, Math.ceil(Math.random()*1000)+file.originalname)
    }
  });
  const upload = multer({storage: storage})
  
app.get('/resume', async function(req, res) {
    
        connection.query("select firstName, lastName, userId, country, resume, dob from onboarding_data", function (err, rows) {
            if(err) {

                res.send({message: "Error while fetching resumes", err});
            } else {
                res.send({message: "Successfulll fetchedd", result: rows});
            }
        })
});

app.post('/resume', upload.single('resume'), async function (req, res) {
   const {firstName, lastName, country, dob} = req.body;
    try {
   var resume = req.file.filename;
    catch (e) {
       console.log("error while reading file");
    }   
   try{
      await connection.query(`insert into onboarding_data (firstName, lastName, country, resume, dob) values (?,?,?,?,?)`, [firstName, lastName, country, resume, dob])
      return res.send({message: "Successfully inserted data"})
  } catch(err) {
    return res.send({message: "There is some error", error: err});
  }
});

var server = app.listen(process.env.PORT || 8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});
