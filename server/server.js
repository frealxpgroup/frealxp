const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');

const ac = require('./Controllers/AuthController');
const fc = require('./Controllers/FunctionalController');
const sc = require('./Controllers/ShopController');

const aws = require('aws-sdk');

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, STRIPE_SECRET_KEY} = process.env
const stripe = require('stripe')(STRIPE_SECRET_KEY)

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
app.get(`/auth/all`, ac.getAllUserIDs)

app.get(`/dash/initial`, fc.getInitial) //current xp and tracked challenges
app.get(`/challenges`, fc.getAllChallenges) //get all active challenges
app.post(`/challenges/one`, fc.getOneChallenge) //get challenge info for modal
app.get(`/history/initial`, fc.getApproved) //get approved challenges for that user
app.post(`/challenge/accepted`, fc.challengeAccepted) //add the challenge to the tracked challenges table
app.post(`/challenge/tracked/one`, fc.getUserChallengeDate) // select the approved date for each challenge that is on tracker based on user
app.get(`/challenge/tracked/all`, fc.getAllChallengeDates)


app.put(`/challenge/submit`, fc.submitChallenge) //create challenge for review
app.put(`/challenge/review/:id`, fc.reviewChallenge) //add feedback or approve challenge

app.get(`/shop/initial`, sc.intial) //get all active products
app.post(`/shop/addToCart`, sc.addToCart) // if needed, generate a new cart, then add selcted item to cart
app.put(`/shop/changeQuantity`, sc.changeQuantity)
app.post(`/shop/cart`, sc.getUserCart) //sql command; get cart by user_id

app.post(`/shop/address`, sc.getAddress) //get address if exists, passing in user id.  Get user id from redux
app.post('/shop/address/add', sc.addAddress) //if address doesn't exist, create a blank one assigned to user_id
app.put(`/shop/address`, sc.editAddress) //add user address to null values in table

app.delete(`/shop/delete/:cartRef`, sc.deleteCart)
app.delete(`/shop/cart/:cartID`, sc.deleteItem) //deletes a product from the car


app.get(`/prizes`, fc.getPrizes)


app.post('/api/payment', function(req, res, next){
    //convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if(amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
          break;
      } else {
          pennies.push(amountArray[i])
      }
    }
    const convertedAmt = parseInt(pennies.join(''));
 
    const charge = stripe.charges.create({
    amount: convertedAmt, // amount in cents, again
    currency: 'usd',
    source: req.body.token.id,
    description: 'Test charge from react app'
  }, function(err, charge) {
      if (err) return res.sendStatus(500)
      return res.sendStatus(200);
    // if (err && err.type === 'StripeCardError') {
    //   // The card has been declined
    // }
  });
  });