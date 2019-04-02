const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');

const ac = require('./Controllers/AuthController');
const fc = require('./Controllers/FunctionalController');
const sc = require('./Controllers/ShopController');

const aws = require('aws-sdk');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: null
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db',db)
    app.listen(SERVER_PORT, () => 
    {console.log(`But that is not this day! This day we fight! For Frodo at port ${SERVER_PORT}`)})
})

app.get('/sign-s3', (req, res) => {

    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
    
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
  
      return res.send(returnData)
    });
  });

app.post(`/auth/register`, ac.register) //create a new user 
app.post(`/auth/login`, ac.login) //verify user info 
app.post(`/auth/logout`, ac.logout) //destroy user on session
app.put(`/auth/edit`, ac.editAuth) //edit user info
app.put(`/auth/password`, ac.editPassword)
app.get(`/user/history`, ac.getXP)

app.get(`/dash/initial`, fc.getInitial) //current xp and tracked challenges
app.get(`/challenges`, fc.getAllChallenges) //get all active challenges
app.post(`/challenges/one`, fc.getOneChallenge) //get challenge info for modal
app.get(`/history/initial`, fc.getApproved) //get approved challenges for that user
app.post(`/challenge/accepted`, fc.challengeAccepted) //add the challenge to the tracked challenges table
app.post(`/challenge/tracked/one`, fc.getUserChallengeDate) // select the approved date for each challenge that is on tracker based on user
app.get(`/challenge/tracked/all`, fc.getAllChallengeDates)


app.post(`/challenge/submit`, fc.submitChallenge) //create challenge for review
app.put(`/challenge/review/:id`, fc.reviewChallenge) //add feedback or approve challenge

app.get(`/shop/initial`, sc.intial) //get all active products
app.post(`/shop/addToCart`, sc.addToCart) // if needed, generate a new cart, then add selcted item to cart
app.put(`/shop/incrementItem`, sc.incrementItem) // if needed, generate a new cart, then add selcted item to cart
app.post(`/shop/cart`, sc.getUserCart) //sql command; get cart by user_id
app.put(`/shop/quantity/:id`, sc.changeQuantity) //changes the quantity of the item in cart

app.post(`/shop/address`, sc.getAddress) //get address if exists, passing in user id.  Get user id from redux
app.put(`/shop/address`, sc.editAddress) //add user address to null values in table

app.put(`/shop/cart/:id`, sc.checkoutFunction)
app.delete(`/shop/cart/:id`, sc.deleteItem) //deletes a product from the car


app.get(`/prizes`, fc.getPrizes)


