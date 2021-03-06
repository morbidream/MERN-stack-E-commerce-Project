const express = require("express");
const router = express.Router();
const Auction = require("../models/Auction");

const User = require('../models/User');



const checkAuth = require("../middlewares/check-auth");
const auctionController = require("../controllers/auction");




const multer = require('multer')

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
///startAuction

router.put("/startauction/:auctionId/:userId",auctionController.startAuction);

router.get("/fetchMyAuctions/:id", auctionController.fetchMyAuctions);
router.get("/", auctionController.fetchAuctions);
router.get("/fetch-auction/:auctionId", auctionController.fetchAuction);
router.post("/add-auction", upload.single("image"),auctionController.addAuction);
router.put("/update-auction/:auctionId",auctionController.editAuction);
router.post("/delete-auction/:auctionId", auctionController.deleteAuction);
router.put("/addbid/:auctionId/:id", auctionController.addbid);
router.post("/add", upload.single('image'), async (req, res) => {
  //console.log(req)

   const imgUrl = `http://localhost:5000/uploads/${req.file.filename}`
  
   try {
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
          duration:duration*360000,
          timer,
          soldAt: new Date().toISOString(),
          catergory,
          auctionStarted,
          auctionEnded,
          sold,
          owner,
          purchasedBy,
          currentBidder,
    
          bids: [],
          room,
         image:imgUrl ,
        
       });
   
       await auction.save();
   
       return res.status(200).json({
    message: "Auction added", auction
       });
     } catch (err) {
       res.status(500);
     }


});
 
module.exports = router;