const Auction = require("../models/Auction");
const User = require("../models/User");

const io = require('../socket');

const cloudinary = require("../utils/cloudinary");

const multer = require('multer');
const { duration } = require("moment");

const storage =multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./uploads/');
    },
    filename: function (req, file , cb){
        cb(null, file.originalname);
    }
});
//to reject a file
// const fileFilter = (req, file ,cb)=>{
//     if(file.mimetype==='image/png'|| file.mimetype==='image/jpeg' ) {
//         cb(null, true)
//     }else{
//         cb(null,false)
//     }
// }

const upload = multer({
    storage:storage,
    // fileFilter:fileFilter
})


exports.fetchAuctions = async (req, res) => {
  try {


  {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
      : {}
    const count = await Auction.countDocuments({ ...keyword })
    const auction = await Auction.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    
    console.log("sssss");
    

    res.json({ auction, page, pages: Math.ceil(count / pageSize) })
  
    console.log(auction);
  }
  } catch (err) {
    res.status(500);

  }
};

///////////////
exports.fetchMyAuctions = async (req, res) => {
  try {

    const id = req.params.id;
  {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
      ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
      : {}

    const count = await Auction.countDocuments({ ...keyword })
    const auction = await Auction.find({ ...keyword,owner:id })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
    
    console.log("mine");
    res.json({ auction, page, pages: Math.ceil(count / pageSize) })
    console.log(auction);
  }
  } catch (err) {
    res.status(500);

  }
};

//////////////
exports.addAuction =  upload.single('image'),async (req, res) => {
  try {
    console.log(req)
    
    const imgUrl = `http://localhost:5000/uploads/${req.file.filename}`

    

    const {
      productName,
      description,
      Price,
      currentPrice,
      duration,
      timer,
      catergory,
      auctionStarted, 
      auctionEnded, 
      sold,
      owner,
  
      purchasedBy,
      currentBidder, 
      room
    } = req.body;




    const auction = new Auction({
      productName,
      description,
      Price,
      currentPrice,
      duration,
      timer,
      soldAt: new Date().toISOString(),
      catergory,
      auctionStarted,
      auctionEnded,
      sold,
      owner: req.user.id,
      purchasedBy,
      currentBidder,
      image:imgUrl ,


      bids: [],
      room
    });

    await auction.save();

    return res.status(200).json({
      message: "Auction added", auction
    });
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};

exports.fetchAuction = async (req, res) => {
  try {
    const id = req.params.auctionId;
    const auction = await Auction.findById({ _id: id });

    res.status(200).json({
      auction,
    });
  } catch (err) {
    res.status(500);
  }
};



/////////////////

exports.deleteAuction = async (req, res) => {
  try {

  

   await Auction.findOneAndDelete(req.params.auctionId);

    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    res.status(500);
  }
};


exports.editAuction = async (req, res) => {

 console.log(req.params.auctionId); 
        await Auction.findOneAndUpdate(req.params.auctionId,
    
      {
        $set: {
          productName,
          description,
          Price,
          currentPrice,
          duration,
          timer,
          catergory,
          auctionStarted, 
          auctionEnded, 
          sold,
          owner,
      
          purchasedBy,
          currentBidder, 
          room
} = req.body

        },
      
    );
    res.status(200).json({
      message: "Auction edited",
    }).catch (err=> {
      res.status(500);
    })

  }




exports.addbid = async (req, res) => {

  try {
    const { currentPrice,currentBidder
} = req.body;

const user = await User.findById(req.params.id);
const name = user.name;
auctionId=req.params.auctionId;



     await Auction.updateOne(
      { _id: auctionId },
      {
        $set: {
          currentBidder:req.params.id,
          currentPrice,
          currentBidder2:name
        },
      }
    );
    console.log(auctionId)
    const auction = await Auction.findById(auctionId)
    const price = auction.currentPrice
    const bidder= auction.currentBidder

    const bidder2= auction.currentBidder2

    console.log(bidder2)
    global.io.emit("newBid"+auctionId,{price},{bidder},{bidder2})
    res.status(200).json({
      message: "bid added",
    })

  } catch (err) {
    res.status(500);
  }

}





exports.startAuction = async (req, res, next) => {

    try {
      var { timer
  } = req.body;
  
  id=req.params.id;
  auctionId=req.params.auctionId;
  
  
  
     
      console.log(auctionId)
      const auction = await Auction.findById(auctionId)

      auction.timer = parseInt(auction.duration);
      auction.auctionEnded = false;
    let intervalTimer = setInterval(async () => {
     
      
  time= auction.timer
  time =time-1000 
      console.log(time)
     
    },1000)

    console.log("b3atht timer")
    await Auction.updateOne(
      { _id: auctionId },
      {
        $set: {
          timer:time,
          
        },
      }
    );

    const timee= auction.timer
    global.io.emit("countdown"+auctionId,{timee})
    res.status(200).json()
    setTimeout(async () => {
      clearInterval(intervalTimer);
    })
   
    } catch (err) {
      res.status(500);
    }
  
  }