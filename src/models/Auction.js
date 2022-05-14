const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    productName: {
        type: String,
        // required: true,
      },
      description: {
        type: String,
      },
    
      Price: {
        type: Number,
        // required: true,
      },
      start_bid_date: {
        type: Number, default: new Date().getTime()
      },
      currentPrice: {
        type: Number,
        // required: true,
      },
      duration: {
        type: Number,
        default: 300,
      },
      timer: {
        type: Number,
        default: 300,
      },
      soldAt: {
        type: Date,
      },
      
      image: {
        type: String,
      },
    cloudinary_id: {
        type: String,
    },
      catergory: {
        type: String,
      },
      auctionStarted: {
        type: Boolean,
        default: false,
      },
      auctionEnded: {
        type: Boolean,
        default: false,
      },
      sold: {
        type: Boolean,
        default: false,
      },
      owner: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      
      purchasedBy: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default:null
      },
      currentBidder: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default:null

      },
      currentBidder2: {
        type: String,
        

      },
     
    },
    { timestamps: true }
  );
module.exports = mongoose.model("Auction", auctionSchema);
