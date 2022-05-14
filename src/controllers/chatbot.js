const Chatbot = require("../models/Chatbot");
const { cloudinary } = require("../utils/cloudinary");

exports.fetchChatbots = async (req, res) => {
  try {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1
  
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
  
    const count = await Chatbot.countDocuments({ ...keyword })
    const chatbots = await Chatbot.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
  
    res.json({ chatbots, page, pages: Math.ceil(count / pageSize) })
  } catch (err) {
    res.status(500);
  }
};

exports.addChatbot = async (req, res) => {

  try {
    const title = req.body.title;
    const contenue = req.body.contenue;
    const product = req.body.product;
    const user = req.body.user;

    const chatbot = new Chatbot({
        title,
        contenue,
        product,
        user,
        chatbot_date: new Date().toISOString(),
    });

    await chatbot.save();

    return res.status(200).json({
      message: "Chatbot added",
      chatbot,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchChatbot = async (req, res) => {
  try {
    const id = req.params.chatbotId;
    const chatbot = await Chatbot.findById({ _id: id });
    res.status(200).json({
        chatbot,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.fetchChatbotByproduct = async (req, res) => {
  try {
    
    const id = req.params.ChatbotId;
    const chatbot = await Chatbot.find({ product: id });
    res.status(200).json({
        chatbot,
    });
  } catch (err) {
    res.status(500);
  }
};

exports.deleteChatbot = async (req, res) => {
  try {
    const chatbotId = req.body._id;

    await Chatbot.deleteOne({ _id: chatbotId });
    const chatbots = await Chatbot.find({});

    return res.status(200).json({ message: "Successfully Deleted", chatbots });
  } catch (err) {
    res.status(500);
  }
};


exports.editChatbot = async (req, res) => {
 
  try {
    const commId = req.body._id;
    const title = req.body.title;
    const contenue = req.body.contenue;
    const product = req.body.product;
    const user = req.body.user;

    await Chatbot.updateOne(
      { _id: commId },
      {
        $set: {
            title,
            contenue,
            product,
            user,
            chatbot_date: new Date().toISOString(),
        },
      }
    );
    res.status(200).json({
      message: "Chatbot edited",
    })

  } catch(err) {
    res.status(500);
  }
}