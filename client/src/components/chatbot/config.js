// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import Options from "../Options/Options";

const config = {
  initialMessages: [createChatBotMessage(`Welcome to 7winta shop`, {
    widget: "options",
  })],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) =>  <div><Options {...props} /> </div>,
     
    },
  ]
}

export default config