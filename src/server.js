const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const db = require("./config/db");
const productRoutes = require("./routings/product");
const userRoutes = require("./routings/user"); 
const brandRoutes = require("./routings/brand")
const categoryRoutes = require("./routings/category")
const ratingRoutes = require("./routings/rating");
const commentRoutes = require("./routings/comment");
const auctionRoutes = require("./routings/auction");
const chatbotRoutes = require("./routings/chatbot");
 
//////////Coupon
const orderRoutes = require("./routings/order");
const couponRoutes = require("./routings/coupon");
const stripeRoutes = require("./routings/stripe");
//////////////

const User = require("./models/User");

//login
const dotenv = require('dotenv'); 
const { OAuth2Client } = require('google-auth-library');
//
const eventRoutes = require("./routings/event");
const donationRoutes = require("./routings/donation");

const production = process.env.NODE_ENV === "production";

require("dotenv").config();


const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();

production && app.use(express.static(path.join(__dirname, "../client/build")));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json())
const http =require("http");
const {Server}=require("socket.io");
const users = [];
//login
function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  upsert(users, { name, email, picture });
  res.status(201);
  res.json({ name, email, picture });
});



// database connection
db.makeDb();
///////COUPON ORDER
app.use("/order", orderRoutes);
app.use("/coupon", couponRoutes);
app.use("/stripe", stripeRoutes);

/////////////
app.use("/auction", auctionRoutes);

app.use("/products", productRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);
app.use("/ratings", ratingRoutes);
app.use("/comments", commentRoutes);
app.use("/chatbot", chatbotRoutes);

////

app.use(
  '/donation',
  cors({
    origin: '*',
    methods: '*',
    credentials: true
  }),
  donationRoutes
);
/// 
app.use("/event", eventRoutes);

app.use(cors());
///////////////////////GET
///////////////////////////



/////
app.use(
  '/user',
  cors({
    origin: '*',
    methods: '*',
    credentials: true
  }),
  userRoutes
);
////////////

app.get('/getUsers', async (req,res) => {
  const users = await User.find({})
  try{
      res.status(200).json({
          status : 'Success',
          data : {
              users
          }
      })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
})

///////////Test

////////////

const server=http.createServer(app);

global.io = new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"],
  },


});

io.on("connection",(socket)=>{
  console.log(`User connected: ${socket.id}`);

  socket.on("ss",(data)=>{
    socket.broadcast.emit("ee");
  })
})
///////////////////////////////////////////
 
 

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} 
app.listen(process.env.PORT || 5000);
