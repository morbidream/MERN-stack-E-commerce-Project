const mongoose = require("mongoose")

const { Schema } = mongoose;

const chatbotSchema = new Schema({
    message: {type: String, required: false},
    text: {type: String, required: false},
    // user: { type : mongoose.Schema.Types.ObjectId,
    //     ref :'User',
    //    },
    // messsage_date: {type: Date, required: false},
        
});
module.exports = mongoose.model("Chatbot", chatbotSchema);