/*var Db  = require('./dboperations'); */
var Quotation  = require('./quotation');
const dboperations = require('./dboperations');

var express = require('express');
var jwt  = require("jsonwebtoken");

var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/quotation').get((request,response)=>{

   dboperations.getQuotations().then(result => {
      response.json(result[0]);
   });

});

router.route('/login').post((request,response)=>{

   const user = {
      id : 1,
      nombre : "Henry",
      email : "jose@email.com"
   }

   jwt.sign({user}, 'secretkey', {expiresIn: '40s'}, (err, token) => {
      response.json({
         token
      });
   });

});

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined')
    {
         const bearerToken = bearerHeader.split(" ")[1];
         req.token = bearerToken;
         next();
    }
    else{
       res.sendStatus(403);
    }
};

router.route('/quotation').post( verifyToken, (request,response)=>{

   jwt.verify(request.token, 'secretkey', (error, authData) => {
      if (error){

         response.send(403);

      }
      else{
         let quotation = {...request.body}

            dboperations.addQuotation(quotation).then(result => {
           // response.status(201).json(result);
         });

          response.json({
               mensaje : "Quotation Creado",
               authData
          });
      }
   });
});


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Quotation API is runnning at ' + port);



