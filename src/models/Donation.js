const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({

    title: {type: String, required: [true, "can't be blank"]},
 
 anonyme:{type:Boolean, default: false},
   
  avatar: {
    type: String,
},
cloudinary_id: {
    type: String,
},

    user: { type: mongoose.Schema.Types.ObjectId, ref : "user"} ,
    
    event: { type: mongoose.Schema.Types.ObjectId, ref : "Event"}
        
},{ timestamps: true });


module.exports =
{
    Donation: mongoose.model("donation", DonationSchema),
}  